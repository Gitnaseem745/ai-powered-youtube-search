import { NextResponse } from 'next/server';
import { enhanceSearchQuery, analyzeVideoRelevance } from '@/mcp/mcp-client.mjs';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    // Enhance the search query using MCP
    const enhancedQuery = await enhanceSearchQuery(query);
    console.log("enhancedQuery: ", enhanceSearchQuery)

    // Fetch videos from YouTube
    const response = await fetch(
      `${YOUTUBE_API_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(enhancedQuery)}&type=video&key=${YOUTUBE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }
    
    const data = await response.json();
    
    // Analyze relevance of each video using MCP
    const videosWithRelevance = await Promise.all(
      data.items.map(async (video: any) => {
        const relevanceScore = await analyzeVideoRelevance(video, query);
        console.log("relevanceScore: ", relevanceScore)
        return {
          ...video,
          relevanceScore
        };
      })
    );
    
    // Sort videos by relevance score
    const sortedVideos = videosWithRelevance.sort(
      (a, b) => b.relevanceScore - a.relevanceScore
    );
    
    return NextResponse.json({
      items: sortedVideos,
      originalQuery: query,
      enhancedQuery
    });
    
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process search request' },
      { status: 500 }
    );
  }
} 
