"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedChanel = exports.FeedBox = void 0;
var typeorm_1 = require("typeorm");
var FeedBox = /** @class */ (function () {
    function FeedBox() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], FeedBox.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            unique: true,
        }),
        __metadata("design:type", String)
    ], FeedBox.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return FeedChanel; }, function (feedChanel) { return feedChanel.feedBox; }, { nullable: true }),
        __metadata("design:type", Array)
    ], FeedBox.prototype, "feedChanels", void 0);
    FeedBox = __decorate([
        (0, typeorm_1.Entity)()
    ], FeedBox);
    return FeedBox;
}());
exports.FeedBox = FeedBox;
// ref to : https://validator.w3.org/feed/docs/rss2.html
var FeedChanel = /** @class */ (function () {
    function FeedChanel() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], FeedChanel.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            unique: true,
        }),
        __metadata("design:type", String)
    ], FeedChanel.prototype, "link", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return FeedBox; }, function (feedBox) { return feedBox.feedChanels; }),
        __metadata("design:type", FeedBox)
    ], FeedChanel.prototype, "feedBox", void 0);
    FeedChanel = __decorate([
        (0, typeorm_1.Entity)()
    ], FeedChanel);
    return FeedChanel;
}());
exports.FeedChanel = FeedChanel;
//# sourceMappingURL=Feed.js.map