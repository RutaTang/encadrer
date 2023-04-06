import { Readability } from "@mozilla/readability";
import { useAtom, useSetAtom } from "jotai";
import { CalendarCheck2, Hourglass, Loader2, PersonStanding } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchHtml } from "../../api";
import { feedItemAtom, zenModeAtom } from "../../state";

const ReadView = () => {
    const [article, setArtile] = useState<any>(null)
    const [feedItem,] = useAtom(feedItemAtom)
    const [zenMode,] = useAtom(zenModeAtom)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (feedItem) {
            setLoading(true)
            fetchHtml({ link: feedItem.link })
                .then(data => {
                    const html = new DOMParser().parseFromString(data, 'text/html');
                    var article = new Readability(html).parse();
                    setArtile(article)
                })
                .finally(() => {
                    setLoading(false)
                })
                ;
        }
    }, [feedItem])
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center mt-8 opacity-60 space-y-3">
                <Loader2 size={20} className="animate-spin" />
                <p>loading...</p>
            </div>
        )
    }
    return (
        (article && feedItem) ? (
            <div className={`h-full w-full ${zenMode && "px-[8%]"}`}>
                <h1 className="text-4xl font-bold mb-3"> {article.title} </h1>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <PersonStanding size={15} />
                        <p>{feedItem.creator}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <CalendarCheck2 size={15} />
                        <p>{new Date(Date.parse(feedItem.pubDate)).toDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Hourglass size={15} />
                        <p>{Math.round(article.length / 1500)} mins</p>
                    </div>

                </div>
                <article className="max-w-none prose pb-5 prose-img:mx-auto" dangerouslySetInnerHTML={{ __html: article.content }}></article>
            </div>
        ) : (
            <p className="text-center mt-8 opacity-60">Choose a feed item to read ~~~</p>
        )
    )
}

export default ReadView
