"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Feed_1 = require("./entity/Feed");
// Singleton AppDataSource, must initConfig before getInstance
var AppDataSource = /** @class */ (function () {
    function AppDataSource() {
    }
    AppDataSource.initConfig = function (config) {
        if (AppDataSource.config) {
            throw new Error("AppDataSource config is already initialized");
        }
        AppDataSource.config = config;
    };
    AppDataSource.getInstance = function () {
        if (!AppDataSource.config) {
            throw new Error("AppDataSource config is not initialized");
        }
        if (!AppDataSource.instance) {
            AppDataSource.instance = new typeorm_1.DataSource({
                type: "sqlite",
                database: AppDataSource.config.path || "./database.sqlite",
                synchronize: true,
                logging: false,
                entities: [Feed_1.FeedBox, Feed_1.FeedChanel,],
                migrations: [],
                subscribers: [],
            });
        }
        return AppDataSource.instance;
    };
    return AppDataSource;
}());
exports.AppDataSource = AppDataSource;
//# sourceMappingURL=data-source.js.map