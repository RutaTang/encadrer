import { AppDataSource } from "../data-source"
import { FeedBox, FeedChanel } from "../entity/Feed"

export async function createFeedBox({ name }: { name: string }) {
    const feedBox = new FeedBox()
    feedBox.name = name
    await AppDataSource.getInstance().manager.save(feedBox)
    return feedBox
}

export async function fetchAllFeedBox() {
    return await AppDataSource.getInstance().manager.find(FeedBox, {
        relations: {
            feedChanels: true
        }
    })
}

export async function createFeedChanal({ link, feedBox }: {
    link: string,
    feedBox: FeedBox
}) {
    const feedChanel = new FeedChanel()
    feedChanel.link = link
    feedChanel.feedBox = feedBox
    await AppDataSource.getInstance().manager.save(feedChanel)
    return feedChanel
}

export async function deleteFeedBox({ id }: { id: number }) {
    await AppDataSource.getInstance().manager.delete(FeedBox, id)
}

export async function renameFeedBox({ id, name }: { id: number, name: string }) {
    const feedBox = await AppDataSource.getInstance().manager.findOneBy(FeedBox, { id })
    feedBox.name = name
    await AppDataSource.getInstance().manager.save(feedBox)
}
