import News from './news/news';
import Sources from './sources/sources';

interface DataArticles {
    articles: {
        author: string;
        content: string;
        description: string;
        publishedAt: string;
        source: {
            id: string;
            name: string;
        };
        title: string;
        url: string;
        urlToImage: string;
    }[];
}

interface DataSources {
    sources: {
        category: string;
        country: string;
        description: string;
        id: string;
        language: string;
        name: string;
        url: string;
    }[];
}

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DataArticles) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DataSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
