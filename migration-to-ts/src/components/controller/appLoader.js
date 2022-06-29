import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '8bf3a071d81849b680a5a20d25b8227d',
        });
    }
}

export default AppLoader;
