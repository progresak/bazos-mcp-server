# Bazos MCP Server

A Model Context Protocol (MCP) server that provides real-time graphics card listings from Bazos.cz marketplace. This server enables AI assistants to search and retrieve current graphics card listings through a standardized interface.

## Features

- Real-time scraping of graphics card listings from pc.bazos.cz/graficka/
- Returns structured data including:
  - Title
  - Price
  - Location
  - URL
  - Image URL
  - Description
- Integration with Claude and other MCP-compatible AI assistants
- Clean TypeScript implementation
- Implemented using [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)

## Installation

```bash
# Clone the repository
git clone https://github.com/progresak/bazos-mcp-server.git

# Install dependencies
npm install
```

## Usage

Build and start the MCP server:

```bash
# Build the TypeScript code
npm run build

# Start the server
npm start
```

For development with automatic recompilation:

```bash
npm run dev
```

### Integration with Claude and other AI Assistants

This server can be used with any MCP-compatible LLM interface, including Claude Desktop. The server provides the following tool:

- `search-graphics-cards`: Search for real graphics card listings on Bazos.cz
  - Parameters:
    - `query` (required): Filter listings by this search term (e.g., "RTX 4090", "RTX 4070")

### MCP Server Configuration

Add this server to your MCP configuration:

```json
{
  "mcpServers": {
    "bazos": {
      "command": "node",
      "args": ["/path-to-this-repository/bazos-mcp-server/dist/index.js"]
    }
  }
}
```

## Implementation Details

The server works by:

1. Receiving a search query via the MCP interface
2. Constructing the appropriate Bazos.cz search URL
3. Scraping the HTML using cheerio
4. Parsing listing information (title, price, location, URLs)
5. Returning structured data to the client

## Project Structure

- `src/index.ts` - Main MCP server implementation
- `src/bazos.ts` - Scraping functionality for Bazos.cz

## Dependencies

- `@modelcontextprotocol/sdk`: For MCP server implementation
- `cheerio`: For HTML parsing and data extraction

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details 