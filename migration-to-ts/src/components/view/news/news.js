"use strict";
exports.__esModule = true;
require("./news.css");
var News = /** @class */ (function () {
    function News() {
    }
    News.prototype.draw = function (data) {
        var news = data.length >= 10 ? data.filter(function (_item, idx) { return idx < 10; }) : data;
        var fragment = document.createDocumentFragment();
        var newsItemTemp = document.querySelector('#newsItemTemp');
        news.forEach(function (item, idx) {
            var newsClone = newsItemTemp.content.cloneNode(true);
            if (idx % 2)
                newsClone.querySelector('.news__item').classList.add('alt');
            newsClone.querySelector('.news__meta-photo').style.backgroundImage = "url(".concat(item.urlToImage || 'img/news_placeholder.jpg', ")");
            newsClone.querySelector('.news__meta-author').textContent =
                item.author || item.source.name;
            newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            newsClone.querySelector('.news__description-title').textContent = item.title;
            newsClone.querySelector('.news__description-source').textContent = item.source.name;
            newsClone.querySelector('.news__description-content').textContent = item.description;
            newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    };
    return News;
}());
exports["default"] = News;
