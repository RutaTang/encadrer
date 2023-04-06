import { FeedBox, FeedChanel } from "../entity/Feed";
export declare function createFeedBox({ name }: {
    name: string;
}): Promise<FeedBox>;
export declare function fetchAllFeedBox(): Promise<FeedBox[]>;
export declare function createFeedChanal({ link, feedBox }: {
    link: string;
    feedBox: FeedBox;
}): Promise<FeedChanel>;
export declare function deleteFeedBox({ id }: {
    id: number;
}): Promise<void>;
export declare function renameFeedBox({ id, name }: {
    id: number;
    name: string;
}): Promise<void>;
