import { CallbackGeneric, getRespObj, Option } from '../../types/index';

enum StatusCodes {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}

class Loader {
    private baseLink: string;
    private options: Option;
    constructor(baseLink: string, options: Option) {
        this.baseLink = baseLink;
        this.options = options;
    }

    protected getResp<T>(
        obj: getRespObj,
        callback: CallbackGeneric<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', obj.endpoint, callback, obj.options as Option);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCodes.UNAUTHORIZED || res.status === StatusCodes.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<Option>, endpoint: string): string {
        const urlOptions: Option = { ...this.options, ...options };
        let url: string | undefined = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: CallbackGeneric<T>, options: Partial<Option>): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => (res as Response).json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
