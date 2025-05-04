import * as cheerio from "cheerio";

interface BazosListing {
    title: string;
    price: string;
    location: string;
    url: string;
    imageUrl: string;
    description: string;
}

export const fetchBazosListings = async (query: string) => {
    const searchUrl = `https://pc.bazos.cz/graficka/?hledat=${encodeURIComponent(query)}`+
                        `&rubriky=pc&hlokalita=&humkreis=25&cenaod=&cenado=&Submit=Hledat&order=&crp=&kitx=ano`;
    
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    const listings: BazosListing[] = [];

    $('.inzeraty').each((_, element) => {
        const $listing = $(element);
        
        const titleElement = $listing.find('h2.nadpis a');
        const title = titleElement.text().trim();
        const url = `https://pc.bazos.cz${titleElement.attr('href')}`;
        const price = $listing.find('div.inzeratycena b').text().trim();
        const location = $listing.find('div.inzeratylok').text().trim();
        const imageUrl = $listing.find('img.obrazek').attr('src') || '';
        const description = $listing.find('div.popis').text().trim();

        listings.push({
            title,
            price,
            location,
            url,
            imageUrl,
            description
        });
    });

    return listings;
}
