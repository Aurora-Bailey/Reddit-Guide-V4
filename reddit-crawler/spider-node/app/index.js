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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var api_1 = require("./reddit/api");
var mongodb_1 = require("./tools/mongodb");
var Main = /** @class */ (function () {
    function Main() {
        this.ready = false;
        this.running = false;
        this.credentials = {
            version: "",
            name: "",
            type: "",
            developer: "",
            url: "",
            app_id: "",
            secret: "",
            id: ""
        };
        this.last_update = 0;
        this.error_log = [];
        this.spider_name = "";
        this.current_target = "";
    }
    Main.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSpider()];
                    case 1:
                        _a.sent();
                        this.t1LoopStart();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.t1LoopStart = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var db_RedditCrawler, db_RedditData, res, indexBefore, indexAfter, arr, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongodb_1["default"].db("reddit-crawler")];
                    case 1:
                        db_RedditCrawler = _b.sent();
                        return [4 /*yield*/, mongodb_1["default"].db("reddit-data")];
                    case 2:
                        db_RedditData = _b.sent();
                        return [4 /*yield*/, db_RedditCrawler
                                .collection("head")
                                .findOneAndUpdate({ tracking: "t1_" }, { $inc: { index: 100 } }, { returnDocument: "before" })];
                    case 3:
                        res = _b.sent();
                        indexBefore = res.value.index;
                        indexAfter = indexBefore + 100;
                        arr = Array.from(Array(100).keys()).map(function (i) {
                            return "t1_" + parseInt(i + indexBefore).toString(36);
                        });
                        return [4 /*yield*/, api_1["default"].info(this.credentials, arr)];
                    case 4:
                        response = _b.sent();
                        if (!(((_a = response === null || response === void 0 ? void 0 : response.response) === null || _a === void 0 ? void 0 : _a.status) === 200)) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_RedditData
                                .collection("comments")
                                .insertMany(response.list.map(function (e) {
                                return e.data;
                            }))["catch"](console.log)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, db_RedditCrawler
                                .collection("spider")
                                .updateOne({ spider_name: this.spider_name }, { $set: { last_update: Date.now() } })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        setTimeout(function () {
                            _this.t1LoopStart();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.t2LoopStart = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var db_RedditCrawler, db_RedditData, res, indexBefore, indexAfter, arr, response;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongodb_1["default"].db("reddit-crawler")];
                    case 1:
                        db_RedditCrawler = _b.sent();
                        return [4 /*yield*/, mongodb_1["default"].db("reddit-data")];
                    case 2:
                        db_RedditData = _b.sent();
                        return [4 /*yield*/, db_RedditCrawler
                                .collection("head")
                                .findOneAndUpdate({ tracking: "t2_" }, { $inc: { index: 100 } }, { returnDocument: "before" })];
                    case 3:
                        res = _b.sent();
                        indexBefore = res.value.index;
                        indexAfter = indexBefore + 100;
                        arr = Array.from(Array(100).keys()).map(function (i) {
                            return "t2_" + parseInt(i + indexBefore).toString(36);
                        });
                        return [4 /*yield*/, api_1["default"].info(this.credentials, arr)];
                    case 4:
                        response = _b.sent();
                        if (!(((_a = response === null || response === void 0 ? void 0 : response.response) === null || _a === void 0 ? void 0 : _a.status) === 200)) return [3 /*break*/, 7];
                        return [4 /*yield*/, db_RedditData
                                .collection("posts")
                                .insertMany(response.list.map(function (e) {
                                return e.data;
                            }))["catch"](console.log)];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, db_RedditCrawler
                                .collection("spider")
                                .updateOne({ spider_name: this.spider_name }, { $set: { last_update: Date.now() } })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        setTimeout(function () {
                            _this.t2LoopStart();
                        }, 1000);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.registerSpider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, spider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongodb_1["default"].db("reddit-crawler")];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.collection("spider").findOne({
                                // Find spider that hasnt been used for at least one minute
                                last_update: { $lte: Date.now() - 60 * 1000 }
                            })];
                    case 2:
                        spider = _a.sent();
                        if (!(spider === null)) return [3 /*break*/, 5];
                        console.log("Waiting for available spider...");
                        return [4 /*yield*/, this.timeout(10000)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.registerSpider()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        this.ready = true;
                        this.credentials = spider.credentials;
                        this.last_update = spider.last_update;
                        this.error_log = spider.error_log;
                        this.spider_name = spider.spider_name;
                        this.current_target = spider.current_target;
                        return [4 /*yield*/, db
                                .collection("spider")
                                .updateOne({ spider_name: this.spider_name }, { $set: { last_update: Date.now() } })];
                    case 6:
                        _a.sent();
                        console.log("Success spider has registered...");
                        _a.label = 7;
                    case 7: return [2 /*return*/, true];
                }
            });
        });
    };
    Main.prototype.timeout = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    return Main;
}());
var main = new Main();
main.start();
