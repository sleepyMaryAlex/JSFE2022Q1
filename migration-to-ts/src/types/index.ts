export interface IDataSources {
    status: string;
    sources: ISources[];
}

export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IDataArticles {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface IArticle {
    source: Pick<ISources, 'id' | 'name'>;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type Option = {
    [prop: string]: string;
};

export type targetType = EventTarget | null;

export type CallbackGeneric<T> = (data?: T) => void;
