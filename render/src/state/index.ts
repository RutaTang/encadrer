// use jotai to manage global state

import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { fetchAllFeedBox } from "../api"

// item list for a certain chanel
export const feedItemsAtom = atom<any[]>([])
export const feedItemsLoadingAtom = atom(false)

// current item
export const feedItemAtom = atom<any>(null)

// feed boxes
const allFeedBoxAtom = atom<any[]>([])

export const useAllFeedBoxAtom = () => {
    const [allFeedBox, setAllFeedBox] = useAtom(allFeedBoxAtom)
    const [allFeedBoxRefresh, setAllFeedBoxRefresh] = useState(0)
    const refreshAllFeedBox = () => {
        setAllFeedBoxRefresh(allFeedBoxRefresh + 1)
    }

    useEffect(() => {
        fetchAllFeedBox().then((allFeedBox) => {
            setAllFeedBox(allFeedBox)
        })
    }, [allFeedBoxRefresh])

    return { refreshAllFeedBox, allFeedBox }
}

// all chanels feed items
export const allFeedItemsAtom = atom<any[]>([])
export const allFeedItemsLoadingAtom = atom(false)

// zen mode
export const zenModeAtom = atom(false)

// feed items filter
export enum FeedItemsFilter {
    All = "All",
    Today = "Today",
    None = "None",
}

export const feedItemsFilterAtom = atom(FeedItemsFilter.All)
