import "reflect-metadata"
import { DataSource } from "typeorm"
import { FeedBox, FeedChanel, FeedItem, } from "./entity/Feed"

interface Config {
    path?: string
}

// Singleton AppDataSource, must initConfig before getInstance
export class AppDataSource {
    private static instance: DataSource;
    private static config: Config;
    private constructor() { }
    public static initConfig(config: Config) {
        if (AppDataSource.config) {
            throw new Error("AppDataSource config is already initialized")
        }
        AppDataSource.config = config
    }
    public static getInstance(): DataSource {
        if (!AppDataSource.config) {
            throw new Error("AppDataSource config is not initialized")
        }
        if (!AppDataSource.instance) {
            AppDataSource.instance = new DataSource({
                type: "sqlite",
                database: AppDataSource.config.path || "./database.sqlite",
                synchronize: true,
                logging: false,
                entities: [FeedBox, FeedChanel, FeedItem],
                migrations: [],
                subscribers: [],
            })
        }
        return AppDataSource.instance
    }
}
