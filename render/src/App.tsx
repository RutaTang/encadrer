import Fuse from "fuse.js"
import { useAtom } from "jotai"
import { Bookmark, CalendarCheck, CalendarCheck2, ChevronRight, Chrome, Divide, Focus, Hourglass, Link, ListMinus, Loader2, Plus, Search } from "lucide-react"
import { useContext, useEffect, useRef, useState } from "react"
import { createFeedBox, rssParse, writeToClipboard, } from "./api"
import FeedCard from "./components/FeedCard"
import FeedCollapse from "./components/FeedCollapse"
import ReadView from "./components/ReadView"
import { ModalContext } from "./contexts/ModalContext"
import { feedItemAtom, feedItemsAtom, FeedItemsFilter, feedItemsFilterAtom, useAllFeedBoxAtom, zenModeAtom } from "./state"

const Left = () => {
    const { showModal, hideModal } = useContext(ModalContext)
    const collectionInputRef = useRef<HTMLInputElement>(null)
    const { allFeedBox, refreshAllFeedBox } = useAllFeedBoxAtom()
    const [, setFeedItemsFilter] = useAtom(feedItemsFilterAtom)
    return (
        <div className="h-full bg-neutral-100 px-3 py-3 pt-10 space-y-5 flex flex-col">
            {/* Main menu */}
            <div className="space-y-2">
                <div className="flex flex-row items-center space-x-2 cursor-pointer select-none" onClick={() => {
                    setFeedItemsFilter(FeedItemsFilter.Today)
                }}>
                    <CalendarCheck size={20} />
                    <p>Today</p>
                </div>
                <div className="flex flex-row items-center space-x-2 cursor-pointer select-none" onClick={() => {
                    setFeedItemsFilter(FeedItemsFilter.All)
                }}>
                    <ListMinus size={20} />
                    <p>All</p>
                </div>
            </div>
            {/* Feeds Menu */}
            <div className="space-y-2 flex-auto basis-full flex flex-col overflow-scroll select-none">
                {/* Header */}
                <div className="w-full flex flex-row justify-between items-center">
                    <p className="opacity-60">Feeds</p>
                    <button
                        onClick={() => {
                            showModal(
                                <div className="px-5 py-2 bg-base-100 rounded-md flex flex-row space-x-5">
                                    <input ref={collectionInputRef} type="text" placeholder="Feed Collection Name" className="input input-ghost w-full max-w-xs focus:outline-none" />
                                    <button className="btn btn-ghost" onClick={() => {
                                        const value = collectionInputRef.current?.value
                                        if (value) {
                                            createFeedBox({ name: value }).finally(() => {
                                                refreshAllFeedBox()
                                                hideModal()
                                            })
                                        }
                                    }}>Save</button>
                                    <button className="btn btn-ghost" onClick={() => {
                                        hideModal()
                                    }}>Cancel</button>
                                </div>
                            )

                        }}
                    ><Plus size={15} className="opacity-60" /></button>
                </div>
                {/* Collections */}
                <div className="space-y-3 overflow-scroll without-scrollbar">
                    {/* Item */}
                    {
                        allFeedBox.map((feedBox) => {
                            return (
                                <FeedCollapse key={feedBox.id} feedBox={feedBox} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const Middle = () => {
    const [feedItems, setFeedItems] = useAtom(feedItemsAtom)
    const [searchText, setSearchText] = useState("")
    const [fuzzySearchedFeedItems, setFuzzySearchedFeedItems] = useState<any[]>([])
    const [feedItemsFilter,] = useAtom(feedItemsFilterAtom)
    const { allFeedBox, } = useAllFeedBoxAtom()

    useEffect(() => {
        if (searchText == "") {
            setFuzzySearchedFeedItems(feedItems)
            return
        }
        const fuse = new Fuse(feedItems, {
            keys: ['title']
        })
        const result = fuse.search(searchText)
        setFuzzySearchedFeedItems(result.map((item) => item.item))
    }, [feedItems, searchText])

    useEffect(() => {
        //fetch all feed items
        if (feedItemsFilter === FeedItemsFilter.All) {
            (async () => {
                let items: any[] = []
                for (let i = 0; i < allFeedBox.length; i++) {
                    const feedBox = allFeedBox[i]
                    for (let j = 0; j < feedBox.feedChanels.length; j++) {
                        const feedChanel = feedBox.feedChanels[j]
                        const link = feedChanel.link
                        const data = await rssParse({ link })
                        items = items.concat(data.items)
                    }
                }
                items.sort((a, b) => {
                    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
                })
                feedItemsFilter === FeedItemsFilter.All && setFeedItems(items)
            })()
        }
        //fetch today feed items
        if (feedItemsFilter === FeedItemsFilter.Today) {
            (async () => {
                let items: any[] = []
                for (let i = 0; i < allFeedBox.length; i++) {
                    const feedBox = allFeedBox[i]
                    for (let j = 0; j < feedBox.feedChanels.length; j++) {
                        const feedChanel = feedBox.feedChanels[j]
                        const link = feedChanel.link
                        const data = await rssParse({ link })
                        items = items.concat(data.items)
                    }
                }
                items = items.filter((item) => {
                    const date = new Date(item.pubDate)
                    const today = new Date()
                    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
                })
                feedItemsFilter === FeedItemsFilter.Today && setFeedItems(items)
            })()
        }
    }, [feedItemsFilter, allFeedBox])
    return (
        <div className="border border-base-300 flex flex-col h-full">

            <div className="flex flex-row items-center px-10 h-16 shrink-0 select-none">
                <Search size={20} className="opacity-60" />
                <input type="text" placeholder="Search..." className="input input-ghost bg-opacity-0 w-full rounded-none px-5 h-full focus:outline-none" onChange={(e) => { setSearchText(e.target.value) }} value={searchText} />
            </div>
            <div className="bg-base-300 h-[1px]"></div>
            {/* Item List */}
            <div className="py-3 overflow-scroll space-y-2 px-3 without-scrollbar">
                {/* Item */}
                {
                    fuzzySearchedFeedItems.length !== 0 ? (fuzzySearchedFeedItems.map((feedItem, idx) => {
                        return (
                            <div key={feedItem.link}>
                                <FeedCard feedItem={feedItem} />
                                {
                                    idx != feedItems.length - 1 && <div className="bg-neutral-100 h-[1px] w-[95%] mx-auto"></div>
                                }
                            </div>
                        )
                    })) : (
                        <div className="text-center mt-16">
                            No Feed Item Found
                        </div>
                    )
                }
            </div>
        </div>

    )

}

const Right = () => {
    const [feedItem, _] = useAtom(feedItemAtom)
    const [zenMode, setZenMode] = useAtom(zenModeAtom)
    return (
        <div className="flex flex-col px-5 h-full">
            {/* Tool enu */}
            <div className={`h-16 w-full grow-0 shrink-0 flex flex-row items-center justify-end space-x-10 ${zenMode && "opacity-0 hover:opacity-100 transition ease-in-out"}`}>
                <button onClick={() => {
                    setZenMode(!zenMode)
                }}>
                    <Focus size={20} />
                </button>
                <button onClick={() => {
                    if (feedItem) {
                        writeToClipboard({ text: feedItem.link })
                    }
                }}>
                    <Link size={20} />
                </button>
                <button onClick={() => {
                    if (feedItem) {
                        window.open(feedItem.link)
                    }
                }}>
                    <Chrome size={20} />
                </button>
            </div>
            <div className="grow overflow-scroll without-scrollbar">
                <ReadView />
            </div>
        </div>

    )
}

function App() {
    const [zenMode,] = useAtom(zenModeAtom)
    return (
        <div className="w-screen h-screen flex flex-row bg-base-100">
            {/* Draggable Regions */}
            <div className="draggable-region w-full h-3 fixed left-0 top-0 z-50">

            </div>
            {/* Left */}
            <div className={`basis-[22%] shrink-0 h-full ${zenMode && "hidden"}`}>
                <Left />
            </div>
            {/* Middle */}
            <div className={`basis-[30%] shrink-0 h-full ${zenMode && " hidden"}`}>
                <Middle />
            </div >
            {/* Right */}
            < div className="basis-[48%] h-full grow overflow-x-scroll" >
                <Right />
            </div >
        </div >
    )
}

export default App
