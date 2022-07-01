import { CallbackGeneric } from './../../types/index';
import { targetType } from '../../types/index';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    public getSources<T>(callback: CallbackGeneric<T>) {
        super.getResp<T>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: CallbackGeneric<T>) {
        let target: targetType = e.target;
        const newsContainer: targetType = e.currentTarget;

        while (target !== newsContainer) {
            if ((target as HTMLElement).classList.contains('source__item')) {
                const sourceId: string | null = (target as HTMLElement).getAttribute('data-source-id');
                if ((newsContainer as HTMLElement).getAttribute('data-source') !== sourceId) {
                    (newsContainer as HTMLElement).setAttribute('data-source', sourceId as string);
                    super.getResp<T>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = (target as HTMLElement).parentNode;
        }
    }
}

export default AppController;
