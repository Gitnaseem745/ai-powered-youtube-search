import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(server => {
    console.log("Initializing AI Video Finder server handlers...");

    // Tool for enhancing search queries
    server.tool(
        "enhance-search",
        "Enhances a search query for better video results",
        {
            query: z.string()
        },
        ({ query }) => {
            console.log("AI Search: Received enhance-search request for query:", query);
            const enhancedQuery = `${query} tutorial`; // Simple enhancement example
            console.log("AI Search: Returning enhanced query:", enhancedQuery);
            return {
                content: [
                    {
                        type: "text",
                        text: enhancedQuery
                    }
                ]
            };
        }
    );

    // Tool for analyzing video relevance
    server.tool(
        "analyze-relevance",
        "Analyzes the relevance of a video to a search query",
        {
            video: z.object({
                snippet: z.object({
                    title: z.string().optional(),
                    description: z.string().optional(),
                    tags: z.array(z.string()).optional(),
                }).passthrough(),
            }).passthrough(),
            query: z.string()
        },
        ({ video, query }) => {
            console.log("AI Search: Received analyze-relevance request for query:", query);
            const title = video.snippet?.title || '';
            const description = video.snippet?.description || '';
            const tags = video.snippet?.tags || [];
            
            // Simple relevance scoring
            const queryLower = query.toLowerCase();
            let score = 0.5; // Default score
            
            if (title.toLowerCase().includes(queryLower)) score += 0.3;
            if (description.toLowerCase().includes(queryLower)) score += 0.1;
            if (tags.some((tag: string) => tag.toLowerCase().includes(queryLower))) score += 0.1;
            
            const finalScore = Math.min(score, 1.0);
            console.log("AI Search: Calculated relevance score:", finalScore);
            
            return {
                content: [
                    {
                        type: "text",
                        text: finalScore.toString()
                    }
                ]
            };
        }
    );

    console.log("AI Video Finder server handlers initialized successfully");
}, {
    capabilities: {
        tools: {},
    }
}, {
    redisUrl: process.env.REDIS_URL,
    verboseLogs: true,
    maxDuration: 60,
});

export { handler as GET, handler as POST, handler as DELETE };
