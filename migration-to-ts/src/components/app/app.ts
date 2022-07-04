import { IDataArticles, IDataSources } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews<IDataArticles>(e, (data) => this.view.drawNews(data as IDataArticles))
        );

        this.controller.getSources<IDataSources>((data) => this.view.drawSources(data as IDataSources));

        this.controller.getInitialNews<IDataArticles>((data) => this.view.drawNews(data as IDataArticles));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.controller.getNewsByPhrase<IDataArticles>((data) => this.view.drawNews(data as IDataArticles));
            }
        });
    }
}

export default App;
