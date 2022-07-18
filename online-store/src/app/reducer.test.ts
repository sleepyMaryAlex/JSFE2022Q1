import { IFiltersSettings, IShoppingCartSettings, ISortSettings } from './../types/types';
import { reducer } from './reducer';
import { addToCart, removeFromCart, applySearchString, applySorting, applyFilters, applyCategory } from './actions';
import Immutable from 'immutable';

test('add to cart should add new item to empty shopping cart', () => {
    let initialStore = getInitialStore();
    const shoppingCart = {
        items: [],
    };
    initialStore = initialStore.update('shoppingCart', () => shoppingCart);
    const cardId = 4;
    const addToCartAction = addToCart(cardId);
    const updatedStore = reducer(initialStore, addToCartAction);
    const actual = (updatedStore.get('shoppingCart') as IShoppingCartSettings).items;
    expect(actual).toEqual([4]);
});

test('add to cart should add new item to non empty shopping cart', () => {
    let initialStore = getInitialStore();
    const shoppingCart = {
        items: [1, 2, 3],
    };
    initialStore = initialStore.update('shoppingCart', () => shoppingCart);
    const cardId = 4;
    const addToCartAction = addToCart(cardId);
    const updatedStore = reducer(initialStore, addToCartAction);
    const actual = (updatedStore.get('shoppingCart') as IShoppingCartSettings).items;
    expect(actual).toEqual([1, 2, 3, 4]);
});

test('remove from cart with single item should return empty shopping cart', () => {
    let initialStore = getInitialStore();
    const shoppingCart = {
        items: [2],
    };
    initialStore = initialStore.update('shoppingCart', () => shoppingCart);
    const cardId = 2;
    const removeFromCartAction = removeFromCart(cardId);
    const updatedStore = reducer(initialStore, removeFromCartAction);
    const actual = (updatedStore.get('shoppingCart') as IShoppingCartSettings).items;
    expect(actual).toEqual([]);
});

test('remove from cart with multiple items should return shopping cart without item', () => {
    let initialStore = getInitialStore();
    const shoppingCart = {
        items: [1, 2, 3],
    };
    initialStore = initialStore.update('shoppingCart', () => shoppingCart);
    const cardId = 2;
    const removeFromCartAction = removeFromCart(cardId);
    const updatedStore = reducer(initialStore, removeFromCartAction);
    const actual = (updatedStore.get('shoppingCart') as IShoppingCartSettings).items;
    expect(actual).toEqual([1, 3]);
});

test('apply search string should update search string in store', () => {
    let initialStore = getInitialStore();
    initialStore = initialStore.update('searchString', () => 'clo');
    const applySearchStringAction = applySearchString('clothes');
    const updatedStore = reducer(initialStore, applySearchStringAction);
    const actual = updatedStore.get('searchString') as string;
    expect(actual).toBe('clothes');
});

test('apply category should update category in store', () => {
    let initialStore = getInitialStore();
    initialStore = initialStore.update('category', () => 'all');
    const applyCategoryAction = applyCategory('pants');
    const updatedStore = reducer(initialStore, applyCategoryAction);
    const actual = updatedStore.get('category') as string;
    expect(actual).toBe('pants');
});

test('apply sorting should replace default settings in store', () => {
    const initialStore = getInitialStore();
    const expected = {
        field: 'title',
        order: 'asc',
    };
    const applySortingAction = applySorting(expected);
    const updatedStore = reducer(initialStore, applySortingAction);
    const actual = updatedStore.get('sortSettings') as ISortSettings;
    expect(actual).toEqual(expected);
});

test('apply sorting should update sorting settings in store', () => {
    let initialStore = getInitialStore();
    const sortSettings = {
        field: 'title',
        order: 'asc',
    };
    initialStore = initialStore.update('sortSettings', () => sortSettings);
    const expected = {
        field: 'year',
        order: 'desc',
    };
    const applySortingAction = applySorting(expected);
    const updatedStore = reducer(initialStore, applySortingAction);
    const actual = updatedStore.get('sortSettings') as ISortSettings;
    expect(actual).toEqual(expected);
});

test('apply filters should replace default settings in store', () => {
    const initialStore = getInitialStore();
    const expected = {
        sizes: ['M', 'XL'],
        colors: ['KHAKI', 'BLACK'],
        price: { minValue: 39, maxValue: 199 },
        brands: [],
        popular: false,
        quantity: { minValue: 10, maxValue: 30 },
        year: { minValue: 2018, maxValue: 2020 },
    };
    const applyFiltersAction = applyFilters(expected);
    const updatedStore = reducer(initialStore, applyFiltersAction);
    const actual = updatedStore.get('filtersSettings') as IFiltersSettings;
    expect(actual).toEqual(expected);
});

test('apply filters should update filters settings in store', () => {
    let initialStore = getInitialStore();
    const filtersSettings = {
        sizes: ['M', 'XL'],
        colors: ['KHAKI', 'BLACK'],
        price: { minValue: 39, maxValue: 199 },
        brands: [],
        popular: false,
        quantity: { minValue: 10, maxValue: 30 },
        year: { minValue: 2018, maxValue: 2020 },
    };
    initialStore = initialStore.update('filtersSettings', () => filtersSettings);
    const expected = {
        sizes: ['S'],
        colors: [],
        price: { minValue: 59, maxValue: 159 },
        brands: [],
        popular: true,
        quantity: { minValue: 20, maxValue: 30 },
        year: { minValue: 2018, maxValue: 2021 },
    };
    const applyFiltersAction = applyFilters(expected);
    const updatedStore = reducer(initialStore, applyFiltersAction);
    const actual = updatedStore.get('filtersSettings') as IFiltersSettings;
    expect(actual).toEqual(expected);
});

const getInitialStore = () => {
    return Immutable.Map<string, unknown>({
        shoppingCart: {
            items: [],
        },
        filtersSettings: {
            sizes: [],
            colors: [],
            price: { minValue: 39, maxValue: 199 },
            brands: [],
            popular: false,
            quantity: { minValue: 0, maxValue: 30 },
            year: { minValue: 2018, maxValue: 2022 },
        },
        category: 'all',
        sortSettings: {
            field: null,
            order: null,
        },
        searchString: '',
    });
};
