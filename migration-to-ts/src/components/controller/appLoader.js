"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var loader_1 = require("./loader");
var AppLoader = /** @class */ (function (_super) {
    __extends(AppLoader, _super);
    function AppLoader() {
        return _super.call(this, 'https://newsapi.org/v2/', {
            apiKey: '8bf3a071d81849b680a5a20d25b8227d'
        }) || this;
    }
    return AppLoader;
}(loader_1["default"]));
exports["default"] = AppLoader;
