export declare class FeedBox {
    id: number;
    name: string;
    feedChanels: string[];
}
export declare class FeedChanel {
    id: number;
    link: string;
    feedBox: FeedBox;
}
