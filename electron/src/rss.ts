import Parser from 'rss-parser';


export async function parseRss(url: string) {
    const parser = new Parser();
    const feed = await parser.parseURL(url);
    return feed;
}
