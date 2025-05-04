import './polyfills';
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchBazosListings } from "./bazos";

// Create an MCP server
const server = new McpServer({
  name: "BazosScraper",
  version: "1.0.0", 
});

// Add a tool to search for graphics cards on Bazos
server.tool(
  "search-graphics-cards",
  "Searches for graphics card listings on Bazos.cz, a Czech online marketplace. Returns listing details including title, price, URL link, location, and description.",
  { query: z.string() },
  async ({ query = "" }) => { 
    try {
      const listings = await fetchBazosListings(query);
    
      if (listings.length === 0) {
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify({ 
              message: `No listings found matching query: ${query}`,
              listings: [] 
            }, null, 2)
          }]
        };
      }
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({ 
            message: `Found ${listings.length} listings${query ? ` matching '${query}'` : ''}`,
            listings
          }, null, 2)
        }]
      };
      
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify({
            error: `Error scraping Bazos: ${error instanceof Error ? error.message : String(error)}`,
            listings: []
          }, null, 2)
        }],
        isError: true
      };
    }
  }
);

// Start the server with stdio transport
const transport = new StdioServerTransport();
server.connect(transport).catch(console.error);