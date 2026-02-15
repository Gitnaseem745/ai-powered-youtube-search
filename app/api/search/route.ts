import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_KEY = process.env.GEMINI_KEY;

if (!YOUTUBE_API_KEY) {
  console.warn('YOUTUBE_API_KEY is not set in environment variables');
}
if (!GEMINI_KEY) {
  console.warn('GEMINI_KEY is not set in environment variables');
}

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

async function refineQueryWithGemini(query: string, retries = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a YouTube search query optimizer. Given a user's search query, rewrite it into the best possible YouTube search query that will return the most relevant and high-quality video results. 

Rules:
- Return ONLY the refined search query, nothing else
- Keep it concise (under 10 words)
- Add relevant keywords that improve YouTube search results
- Remove filler words and make it search-engine friendly
- Fix any typos or spelling errors in the query
- If the query is already good, return it as-is with minor improvements

User query: "${query}"

Refined YouTube search query:`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 50,
          }
        })
      });

      if (response.status === 429 && attempt < retries) {
        // Rate limited — wait and retry
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }

      if (!response.ok) {
        console.error('Gemini API error:', response.status);
        return query;
      }

      const data = await response.json();
      const refined = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      
      if (!refined) return query;
      
      // Clean up any quotes or extra whitespace
      return refined.replace(/^["']|["']$/g, '').trim();
    } catch (error) {
      console.error('Gemini refinement error:', error);
      if (attempt === retries) return query;
    }
  }
  return query;
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Step 1: Refine query with Gemini AI
    const refinedQuery = GEMINI_KEY 
      ? await refineQueryWithGemini(query)
      : query;
    
    console.log(`Search: "${query}" → AI refined: "${refinedQuery}"`);

    // Step 2: Fetch videos from YouTube with the refined query
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(refinedQuery)}&type=video&key=${YOUTUBE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }
    const data = await response.json();

    return NextResponse.json({
      items: data.items,
      originalQuery: query,
      refinedQuery: refinedQuery,
    });
    
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    );
  }
} 
