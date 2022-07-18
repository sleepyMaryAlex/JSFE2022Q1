import Immutable from 'immutable';
import {
    IAction,
    IInitializeStoreAction,
    IApplySortingAction,
    IApplyCategoryAction,
    IFiltersSettings,
    ICard,
    IApplyFiltersAction,
    IRangeState,
    ISortSettings,
    IAddToCartAction,
    IRemoveFromCartAction,
    IShoppingCartSettings,
    IApplySearchString,
} from '../types/types';
import cards from './cards';

const sortBy = function <T>(a: T, b: T, order: string) {
    const reverse = order === 'asc' ? 1 : -1;
    if (a > b) {
        return 1 * reverse;
    } else if (a < b) {
        return -1 * reverse;
    } else {
        return 0;
    }
};

const applySizeFilter = (card: ICard, sizes: string[]) => {
    return sizes.length === 0 || card.size.some((size) => sizes.includes(size));
};

const applyColorFilter = (card: ICard, colors: string[]) => {
    return colors.length === 0 || card.color.some((color) => colors.includes(color));
};

const applyPriceFilter = (card: ICard, price: IRangeState) => {
    const cardPrice = Number(card.price.split(' ')[0]);
    return cardPrice >= price.minValue && cardPrice <= price.maxValue;
};

const applyBrandFilter = (card: ICard, brands: string[]) => {
    return brands.length === 0 || brands.includes(card.brand);
};

const applyPopularFilter = (card: ICard, popular: boolean) => {
    return !popular || card.popular;
};

const applyQuantityFilter = (card: ICard, quantity: IRangeState) => {
    return card.quantity >= quantity.minValue && card.quantity <= quantity.maxValue;
};

const applyYearFilter = (card: ICard, year: IRangeState) => {
    return card.year >= year.minValue && card.year <= year.maxValue;
};

const applyFilters = (card: ICard, settings: IFiltersSettings) => {
    return (
        applySizeFilter(card, settings.sizes) &&
        applyColorFilter(card, settings.colors) &&
        applyPriceFilter(card, settings.price) &&
        applyBrandFilter(card, settings.brands) &&
        applyPopularFilter(card, settings.popular) &&
        applyQuantityFilter(card, settings.quantity) &&
        applyYearFilter(card, settings.year)
    );
};

const getCards = (store: Immutable.Map<string, unknown>) => {
    let items = cards;

    const category = store.get('category') as string;
    switch (category) {
        case 'all':
            break;
        default:
            items = items.filter((item) => item.category === category);
            break;
    }

    const filtersSettings = store.get('filtersSettings') as IFiltersSettings;
    items = items.filter((item) => applyFilters(item, filtersSettings));

    const searchString = store.get('searchString') as string | null;
    if (searchString) {
        items = items.filter((item) => item.title.toLowerCase().includes(searchString.toLowerCase()));
    }

    const sortSettings = store.get('sortSettings') as ISortSettings | null;
    if (sortSettings) {
        switch (sortSettings.field) {
            case 'title':
                items = items.sort((a, b) => sortBy<string>(a.title, b.title, sortSettings.order as string));
                break;
            case 'year':
                items = items.sort((a, b) => sortBy<number>(a.year, b.year, sortSettings.order as string));
                break;
        }
    }

    return items;
};

const addToCart = (cardId: number, shoppingCart: IShoppingCartSettings) => {
    return {
        items: [...shoppingCart.items, cardId],
    };
};

const removeFromCart = (cardId: number, shoppingCart: IShoppingCartSettings) => {
    return {
        items: shoppingCart.items.filter((item) => item !== cardId),
    };
};

export const reducer = (store: Immutable.Map<string, unknown> = Immutable.Map<string, unknown>(), action: IAction) => {
    switch (action.type) {
        case 'INITIALIZE_STORE':
            store = store.merge((action as IInitializeStoreAction).state);
            break;

        case 'APPLY_SORTING':
            store = store.update('sortSettings', () => (action as IApplySortingAction).state);
            break;

        case 'APPLY_CATEGORY':
            store = store.update('category', () => (action as IApplyCategoryAction).state);
            break;

        case 'APPLY_FILTERS':
            store = store.update('filtersSettings', () => (action as IApplyFiltersAction).state);
            break;

        case 'ADD_TO_CART':
            store = store.update('shoppingCart', (items) =>
                addToCart((action as IAddToCartAction).state, items as IShoppingCartSettings)
            );
            localStorage.setItem('shoppingCart', JSON.stringify(store.get('shoppingCart')));
            break;

        case 'REMOVE_FROM_CART':
            store = store.update('shoppingCart', (items) =>
                removeFromCart((action as IRemoveFromCartAction).state, items as IShoppingCartSettings)
            );
            localStorage.setItem('shoppingCart', JSON.stringify(store.get('shoppingCart')));
            break;

        case 'APPLY_SEARCH_STRING':
            store = store.update('searchString', () => (action as IApplySearchString).state);
            break;

        case 'RESET_ALL_SETTINGS':
            localStorage.clear();
            location.reload();
            break;
    }

    return store.update('cards', () => getCards(store));
};
