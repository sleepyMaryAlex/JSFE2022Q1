import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '8bf3a071d81849b680a5a20d25b8227d',
        });
    }
}

export default AppLoader;
