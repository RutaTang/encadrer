import "reflect-metadata";
import { DataSource } from "typeorm";
interface Config {
    path?: string;
}
export declare class AppDataSource {
    private static instance;
    private static config;
    private constructor();
    static initConfig(config: Config): void;
    static getInstance(): DataSource;
}
export {};
