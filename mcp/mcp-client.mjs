import { McpClient } from "@modelcontextprotocol/sdk/client/mcp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

// Local MCP server configuration
const LOCAL_MCP_URL = "http://localhost:3000/api/mcp";

// Create SSE transport for local MCP server
const transport = new SSEClientTransport(new URL(`${LOCAL_MCP_URL}/sse`));

// Initialize MCP client
const client = new McpClient({
  name: "local-video-finder",
  version: "1.0.0",
  capabilities: {
    prompts: {},
    resources: {},
    tools: {},
  }
});

// Connect to MCP server
async function connectToMCP() {
  try {
    console.log("Attempting to connect to MCP server at:", LOCAL_MCP_URL);
    await client.connect(transport);
    const capabilities = client.getServerCapabilities();
    console.log("Successfully connected to MCP server. Capabilities:", capabilities);
    return client;
  } catch (error) {
    console.error("Failed to connect to MCP server:", error);
    throw error;
  }
}

// Function to enhance search query
export async function enhanceSearchQuery(query) {
  try {
    console.log("Enhancing search query:", query);
    const mcpClient = await connectToMCP();
    const response = await mcpClient.request({
      type: "enhance-search",
      query: query
    });
    console.log("MCP enhance-search response:", response);
    return response.enhancedQuery || query;
  } catch (error) {
    console.error("Error enhancing search query:", error);
    return query; // Fallback to original query
  }
}

// Function to analyze video relevance
export async function analyzeVideoRelevance(video, query) {
  try {
    console.log("Analyzing video relevance for query:", query);
    const mcpClient = await connectToMCP();
    const response = await mcpClient.request({
      type: "analyze-relevance",
      video: video,
      query: query
    });
    console.log("MCP analyze-relevance response:", response);
    return response.relevanceScore || 0.5;
  } catch (error) {
    console.error("Error analyzing video relevance:", error);
    return 0.5; // Default score
  }
}

// Test the connection
if (require.main === module) {
  console.log("Testing MCP client connection...");
  connectToMCP()
    .then(() => {
      console.log("MCP client is ready for testing");
    })
    .catch((error) => {
      console.error("Failed to initialize MCP client:", error);
      process.exit(1);
    });
}
