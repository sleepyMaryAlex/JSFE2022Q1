import AppController from '../controller/controller';
import { AppView } from '../view/appView';

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

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews(data as DataArticles))
        );
        this.controller.getSources((data) => this.view.drawSources(data as DataSources));
    }
}

export default App;
