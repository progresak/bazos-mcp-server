# Bazos MCP Server

A TypeScript-based tool for scraping and monitoring graphics card listings from Bazos.cz marketplace. This tool helps users find the best deals on graphics cards by providing structured data from Bazos listings.

## Features

- Scrapes graphics card listings from Bazos.cz
- Provides structured data including:
  - Title
  - Price
  - Location
  - URL
  - Image URL
  - Description
- Clean TypeScript implementation
- Uses modern web scraping techniques with Cheerio

## Installation

```bash
# Clone the repository
git clone https://github.com/progresak/bazos-mcp-server.git

# Install dependencies
npm install
```

## Usage

```typescript
import { fetchBazosListings } from './src/bazos';

// Example: Search for RTX 4090 listings
const listings = await fetchBazosListings('RTX 4090');
console.log(listings);
```

## API Reference

### `fetchBazosListings(query: string)`

Fetches graphics card listings from Bazos.cz based on the search query.

#### Parameters

- `query` (string): Search term for graphics cards (e.g., "RTX 4090", "RTX 4070")

#### Returns

Array of `BazosListing` objects with the following structure:

```typescript
interface BazosListing {
    title: string;      // Title of the listing
    price: string;      // Price in CZK
    location: string;   // Location of the seller
    url: string;        // Direct link to the listing
    imageUrl: string;   // URL of the listing image
    description: string; // Listing description
}
```

## Dependencies

- `cheerio`: For HTML parsing and data extraction
- `node-fetch`: For making HTTP requests

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details 