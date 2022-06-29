"use strict";
exports.__esModule = true;
exports.AppView = void 0;
var news_1 = require("./news/news");
var sources_1 = require("./sources/sources");
var AppView = /** @class */ (function () {
    function AppView() {
        this.news = new news_1["default"]();
        this.sources = new sources_1["default"]();
    }
    AppView.prototype.drawNews = function (data) {
        var values = (data === null || data === void 0 ? void 0 : data.articles) ? data === null || data === void 0 ? void 0 : data.articles : [];
        this.news.draw(values);
    };
    AppView.prototype.drawSources = function (data) {
        var values = (data === null || data === void 0 ? void 0 : data.sources) ? data === null || data === void 0 ? void 0 : data.sources : [];
        this.sources.draw(values);
    };
    return AppView;
}());
exports.AppView = AppView;
exports["default"] = AppView;
