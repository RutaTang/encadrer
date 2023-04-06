import { useAtom } from "jotai"
import { feedItemAtom, } from "../../state"

const FeedCard = ({ feedItem }: {
    feedItem: any
}) => {
    const [_, setFeedItem] = useAtom(feedItemAtom)
    return (
        <div className="px-3 py-3 w-full select-none cursor-pointer" onClick={() => {
            setFeedItem(feedItem)
        }} >
            <p className="font-bold line-clamp-3">{feedItem.title}</p>
            <p>{new Date(Date.parse(feedItem.pubDate)).toDateString()}</p>
        </div>
    )
}
export default FeedCard
