"use strict";
exports.__esModule = true;
var controller_1 = require("../controller/controller");
var appView_1 = require("../view/appView");
var App = /** @class */ (function () {
    function App() {
        this.controller = new controller_1["default"]();
        this.view = new appView_1.AppView();
    }
    App.prototype.start = function () {
        var _this = this;
        document.querySelector('.sources').addEventListener('click', function (e) {
            return _this.controller.getNews(e, function (data) { return _this.view.drawNews(data); });
        });
        this.controller.getSources(function (data) { return _this.view.drawSources(data); });
    };
    return App;
}());
exports["default"] = App;
