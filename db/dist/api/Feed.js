"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFeedBox = exports.deleteFeedBox = exports.createFeedChanal = exports.fetchAllFeedBox = exports.createFeedBox = void 0;
var data_source_1 = require("../data-source");
var Feed_1 = require("../entity/Feed");
function createFeedBox(_a) {
    var name = _a.name;
    return __awaiter(this, void 0, void 0, function () {
        var feedBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    feedBox = new Feed_1.FeedBox();
                    feedBox.name = name;
                    return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.save(feedBox)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, feedBox];
            }
        });
    });
}
exports.createFeedBox = createFeedBox;
function fetchAllFeedBox() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.find(Feed_1.FeedBox, {
                        relations: {
                            feedChanels: true
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.fetchAllFeedBox = fetchAllFeedBox;
function createFeedChanal(_a) {
    var link = _a.link, feedBox = _a.feedBox;
    return __awaiter(this, void 0, void 0, function () {
        var feedChanel;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    feedChanel = new Feed_1.FeedChanel();
                    feedChanel.link = link;
                    feedChanel.feedBox = feedBox;
                    return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.save(feedChanel)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, feedChanel];
            }
        });
    });
}
exports.createFeedChanal = createFeedChanal;
function deleteFeedBox(_a) {
    var id = _a.id;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.delete(Feed_1.FeedBox, id)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteFeedBox = deleteFeedBox;
function renameFeedBox(_a) {
    var id = _a.id, name = _a.name;
    return __awaiter(this, void 0, void 0, function () {
        var feedBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.findOneBy(Feed_1.FeedBox, { id: id })];
                case 1:
                    feedBox = _b.sent();
                    feedBox.name = name;
                    return [4 /*yield*/, data_source_1.AppDataSource.getInstance().manager.save(feedBox)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.renameFeedBox = renameFeedBox;
//# sourceMappingURL=Feed.js.map