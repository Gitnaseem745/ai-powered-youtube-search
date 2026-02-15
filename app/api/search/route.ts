import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.warn('YOUTUBE_API_KEY is not set in environment variables');
}
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Fetch videos from YouTube
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }
    
    const data = await response.json();
    
    return NextResponse.json({
      items: data.items,
      originalQuery: query
    });
    
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    );
  }
} 
