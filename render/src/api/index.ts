const api = (window as any).electron

export async function fetchAllFeedBox() {
    const feedBoxes = await api.fetchAllFeedBox();
    return feedBoxes;
}

export async function createFeedBox({ name }: { name: string }) {
    await api.createFeedBox({ name });
}

export async function createFeedChanel({ link, feedBox }: { link: string, feedBox: any }) {
    await api.createFeedChanel({ link, feedBox });
}

export async function deleteFeedBox({ id }: { id: number }) {
    await api.deleteFeedBox({ id });
}

export async function renameFeedBox({ id, name }: { id: number, name: string }) {
    await api.renameFeedBox({ id, name });
}

export async function rssParse({ link }: { link: string }) {
    const feed = await api.rssParse({ link });
    return feed;
}

export async function fetchHtml({ link }: { link: string }) {
    const data = await api.fetchHtml({ link });
    return data;
}

export async function writeToClipboard({ text }: { text: string }) {
    await api.writeToClipboard({ text });
}
