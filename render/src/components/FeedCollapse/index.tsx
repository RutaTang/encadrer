import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Cat, ChevronRight, FileEdit, MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { createFeedChanel, deleteFeedBox, renameFeedBox, rssParse } from "../../api";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";
import { ModalContext } from "../../contexts/ModalContext";
import { allFeedItemsAtom, feedItemsAtom, FeedItemsFilter, feedItemsFilterAtom, useAllFeedBoxAtom } from "../../state";
import Img from "../Img";

const FeedChanel = ({ feedChanel }: { feedChanel: any }) => {
    const [feedChanelDetail, setFeedChanelDetail] = useState<any>(null)
    const [_, setItems] = useAtom(feedItemsAtom)
    const [, setFeedItemsFilter] = useAtom(feedItemsFilterAtom)
    useEffect(() => {
        rssParse({ link: feedChanel.link }).then(feed => {
            setFeedChanelDetail(feed)
        })
    }, [])
    return (
        feedChanelDetail ? (
            <div className="flex flex-row items-center justify-between select-none cursor-pointer" onClick={() => {
                setFeedItemsFilter(FeedItemsFilter.None)
                setItems(feedChanelDetail.items)
            }}>
                <div className="flex flex-row items-center space-x-2">
                    <div className="avatar">
                        <div className="w-6 h-6 rounded-full">
                            {
                                feedChanelDetail.image?.url ? (
                                    <Img src={feedChanelDetail.image?.url} />
                                ) : (
                                    <Cat />
                                )
                            }
                        </div>
                    </div>
                    <p className="line-clamp-1">{feedChanelDetail.title}</p>
                </div>
                <p className="opacity-60">
                    {feedChanelDetail.items.length}
                </p>
            </div>
        ) : (
            <div className="flex flex-row animate-pulse items-center justify-between select-none cursor-pointer" >
                <div className="flex flex-row items-center space-x-2">
                    <div className="avatar">
                        <div className="w-6 h-6 rounded-full bg-base-300">
                        </div>
                    </div>
                    <div className="h-2 w-16 bg-base-300 rounded col-span-2"></div>
                </div>
            </div >

        )
    )
}

const FeedCollapse = ({ feedBox }: {
    feedBox: any
}) => {
    const { showModal, hideModal } = useContext(ModalContext)
    const [open, setOpen] = useState(false)
    const fadeIn = {
        hidden: { opacity: 0, display: "none" },
        visible: { opacity: 1, display: "block" },
    };
    const feedUrlInputRef = useRef<HTMLInputElement>(null)
    const renameInputRef = useRef<HTMLInputElement>(null)
    const { showMenu } = useContext(ContextMenuContext)
    const { refreshAllFeedBox } = useAllFeedBoxAtom()
    return (
        <div className="space-y-2">
            <div className="flex flex-row items-center justify-between"
                onContextMenu={(e) => {
                    showMenu({
                        items: [
                            {
                                label: "Rename",
                                onClick: () => {
                                    showModal(
                                        (
                                            <div className="px-3 py-2 bg-base-100 flex flex-row items-center rounded">
                                                <input ref={renameInputRef} type="text" className="input w-full focus:outline-none outline-none" placeholder="New name" />
                                                <button className="btn btn-ghost" onClick={() => {
                                                    if (renameInputRef.current?.value) {
                                                        renameFeedBox({
                                                            id: feedBox.id,
                                                            name: renameInputRef.current?.value
                                                        }).finally(() => {
                                                            refreshAllFeedBox()
                                                            hideModal()
                                                        })
                                                    }
                                                }}>
                                                    Save
                                                </button>
                                                <button className="btn btn-ghost" onClick={() => {
                                                    hideModal()
                                                }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        )
                                    )
                                },
                            },
                            {
                                label: "Add Feed",
                                onClick: () => {
                                    showModal(
                                        <div className="px-3 py-2 bg-base-100 flex flex-row items-center rounded">
                                            <input ref={feedUrlInputRef} type="text" className="input w-full focus:outline-none outline-none" placeholder="Feed URL" />
                                            <button className="btn btn-ghost" onClick={() => {
                                                if (feedUrlInputRef.current?.value) {
                                                    createFeedChanel({
                                                        link: feedUrlInputRef.current?.value,
                                                        feedBox: feedBox
                                                    }).finally(() => {
                                                        refreshAllFeedBox()
                                                        hideModal()
                                                    })
                                                }
                                            }}>
                                                Save
                                            </button>
                                            <button className="btn btn-ghost" onClick={() => {
                                                hideModal()
                                            }}>
                                                Cancel
                                            </button>
                                        </div>
                                    )
                                },
                            },
                            {
                                label: "Delete",
                                onClick: () => {
                                    showModal(
                                        <div className="px-3 py-2 bg-base-100 flex flex-row items-center rounded space-x-3">
                                            <p className="text-error">
                                                Are you sure you want to delete this feed box and all the feeds?
                                            </p>
                                            <button className="btn btn-ghost" onClick={() => {
                                                deleteFeedBox({ id: feedBox.id }).finally(() => {
                                                    refreshAllFeedBox()
                                                    hideModal()
                                                })
                                            }}>
                                                Yes
                                            </button>
                                            <button className="btn btn-ghost" onClick={() => {
                                                hideModal()
                                            }}>
                                                No
                                            </button>
                                        </div>
                                    )
                                },
                            }
                        ],
                        position: {
                            x: e.clientX,
                            y: e.clientY
                        }
                    })
                }}
            >
                <div className="space-x-2 flex flex-row items-center cursor-pointer select-none"
                    onClick={() => {
                        setOpen(!open)
                    }}
                >
                    <ChevronRight size={20} className={`transition ${open && "rotate-90"}`} />
                    <p>{feedBox.name}</p>
                </div>
            </div>
            {/* Feeds List */}
            <motion.div initial="hidden" transition={{ type: "spring" }} variants={fadeIn} animate={open ? "visible" : "hidden"} className="pl-5 space-y-3">
                {/* Feed */}
                {
                    feedBox.feedChanels.map((feedChanel: any) => {
                        return <FeedChanel key={feedChanel.id} feedChanel={feedChanel} />
                    })
                }
            </motion.div>
        </div >
    )
}

export default FeedCollapse
