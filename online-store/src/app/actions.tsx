import { IFiltersSettings, ISortSettings } from '../types/types';

export const applySorting = (settings: ISortSettings) => {
    return {
        type: 'APPLY_SORTING',
        state: settings,
    };
};

export const applyCategory = (category: string) => {
    return {
        type: 'APPLY_CATEGORY',
        state: category,
    };
};

export const applyFilters = (settings: IFiltersSettings) => {
    return {
        type: 'APPLY_FILTERS',
        state: settings,
    };
};

export const addToCart = (cardId: number) => {
    return {
        type: 'ADD_TO_CART',
        state: cardId,
    };
};

export const removeFromCart = (cardId: number) => {
    return {
        type: 'REMOVE_FROM_CART',
        state: cardId,
    };
};

export const applySearchString = (searchString: string) => {
    return {
        type: 'APPLY_SEARCH_STRING',
        state: searchString,
    };
};

export const resetAllSettings = () => {
    return {
        type: 'RESET_ALL_SETTINGS',
    };
};
