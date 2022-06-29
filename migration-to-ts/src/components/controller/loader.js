"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Loader = /** @class */ (function () {
    function Loader(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
    }
    Loader.prototype.getResp = function (_a, callback) {
        var _b = _a.endpoint, endpoint = _b === void 0 ? '' : _b, _c = _a.options, options = _c === void 0 ? {} : _c;
        if (callback === void 0) { callback = function () {
            console.error('No callback for GET response');
        }; }
        this.load('GET', endpoint, callback, options);
    };
    Loader.prototype.errorHandler = function (res) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log("Sorry, but there is ".concat(res.status, " error: ").concat(res.statusText));
            throw Error(res.statusText);
        }
        return res;
    };
    Loader.prototype.makeUrl = function (options, endpoint) {
        var urlOptions = __assign(__assign({}, this.options), options);
        var url = "".concat(this.baseLink).concat(endpoint, "?");
        Object.keys(urlOptions).forEach(function (key) {
            url += "".concat(key, "=").concat(urlOptions[key], "&");
        });
        return url.slice(0, -1);
    };
    Loader.prototype.load = function (method, endpoint, callback, options) {
        if (options === void 0) { options = {}; }
        fetch(this.makeUrl(options, endpoint), { method: method })
            .then(this.errorHandler)
            .then(function (res) { return res.json(); })
            .then(function (data) { return callback(data); })["catch"](function (err) { return console.error(err); });
    };
    return Loader;
}());
exports["default"] = Loader;
