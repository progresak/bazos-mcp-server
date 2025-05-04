import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";

const getQueryFromArgs = () => {
  const userArgs = process.argv.slice(2);
  return userArgs.join(" ") || "Geforce RTX";
};

async function main() {
  // Create a client
  const client = new Client({
    name: "BazosClient",
    version: "1.0.0"
  });

  // Connect to the server using stdio transport
  const scriptPath = path.resolve(__dirname, "index.ts");
  const transport = new StdioClientTransport({
    command: "node",
    args: ["-r", "ts-node/register", scriptPath]
  });

  try {
    console.log("Connecting to MCP server...");
    await client.connect(transport);
    console.log("Connected successfully!");

    // List available tools
    const tools = await client.listTools();
    console.log("\nAvailable tools:", tools.tools.map(t => t.name));

    // Get search query from command line
    const searchQuery = getQueryFromArgs();
    console.log(`\nSearching for graphics cards matching: "${searchQuery}"...`);
    
    // Search for graphics cards with query
    const rtxResults = await client.callTool({
      name: "search-graphics-cards",
      arguments: {
        query: searchQuery
      }
    });
    
    // Add type assertion for the content
    const rtxContent = rtxResults.content as Array<{ type: string, text: string }>;
    const rtxResponse = JSON.parse(rtxContent[0].text);
    console.log(rtxResponse.message);
    
    // Print first 3 results (if available)
    const rtxListings = rtxResponse.listings || [];
    const displayCount = Math.min(3, rtxListings.length);
    for (let i = 0; i < displayCount; i++) {
      const listing = rtxListings[i];
      console.log(`\n${i + 1}. ${listing.title}`);
      console.log(`   Price: ${listing.price}`);
      console.log(`   Location: ${listing.location}`);
    }
    
    console.log("\nTest completed successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the connection
    await transport.close();
  }
}

main().catch(console.error); 