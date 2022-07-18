export interface ICard {
    title: string;
    color: string[];
    image: string;
    description: string;
    category: string;
    price: string;
    size: string[];
    brand: string;
    quantity: number;
    year: number;
    popular: boolean;
    id: number;
}

export interface IAction {
    type: string;
}

export interface IActionWithState<T> extends IAction {
    state: T;
}

export type IInitializeStoreAction = IActionWithState<Immutable.Map<string, unknown>>;

export type IApplySortingAction = IActionWithState<ISortSettings>;

export type IApplyCategoryAction = IActionWithState<string>;

export type IApplyFiltersAction = IActionWithState<IFiltersSettings>;

export type IAddToCartAction = IActionWithState<number>;

export type IRemoveFromCartAction = IActionWithState<number>;

export type IApplySearchString = IActionWithState<string>;

export interface ISortSettings {
    field: string | null;
    order: string | null;
}

export interface IFiltersSettings {
    sizes: string[];
    colors: string[];
    price: IRangeState;
    brands: string[];
    popular: boolean;
    quantity: IRangeState;
    year: IRangeState;
}

export interface IShoppingCartSettings {
    items: number[];
}

export interface ICategorySettings {
    category: string;
}

export interface IAppContext {
    cards: ICard[];
    shoppingCart: IShoppingCartSettings;
    filtersSettings: IFiltersSettings;
    category: string;
    sortSettings: ISortSettings;
    searchString: string;
    applySorting: (settings: ISortSettings) => IApplySortingAction;
    applyCategory: (category: string) => IApplyCategoryAction;
    applyFilters: (settings: IFiltersSettings) => IApplyFiltersAction;
    addToCart: (cardId: number) => IAddToCartAction;
    removeFromCart: (cardId: number) => IRemoveFromCartAction;
    resetAllSettings: () => IAction;
    applySearchString: (searchString: string) => IApplySearchString;
}

export interface IShoppingCartContext {
    shoppingCart: IShoppingCartSettings;
}

export interface IHeaderContext {
    category: string;
    isMenuOpen: boolean;
    setMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
    isFiltersOpen: boolean;
    searchString: string;
    setFiltersStatus: React.Dispatch<React.SetStateAction<boolean>>;
    applyCategory: (category: string) => IApplyCategoryAction;
    applySearchString: (searchString: string) => IApplySearchString;
}

export interface IFiltersContext {
    isFiltersOpen: boolean;
    filtersSettings: IFiltersSettings;
    setFiltersStatus: React.Dispatch<React.SetStateAction<boolean>>;
    applyFilters: (settings: IFiltersSettings) => IApplyFiltersAction;
}

export interface ICategoriesContext {
    applyCategory: (category: string) => IApplyCategoryAction;
    category: string;
}

export interface ISortMenuContext {
    isMenuOpen: boolean;
    sortSettings: ISortSettings | null;
    setMenuStatus: React.Dispatch<React.SetStateAction<boolean>>;
    applySorting: (settings: ISortSettings) => IApplySortingAction;
    resetAllSettings: () => IAction;
}

export interface IPopupStatus {
    isOpen: boolean;
    cardId: number | null;
}

export interface IPopupContext {
    isPopupOpen: boolean;
    setPopupStatus: React.Dispatch<React.SetStateAction<boolean>>;
    cardId: number;
}

export interface ICardContext {
    card: ICard;
    setPopupStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setCardId: React.Dispatch<React.SetStateAction<number>>;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    shoppingCart: IShoppingCartSettings;
    addToCart: (cardId: number) => IAddToCartAction;
    removeFromCart: (cardId: number) => IRemoveFromCartAction;
}

export interface IMainContext {
    cards: ICard[];
    applySorting: (settings: ISortSettings) => IApplySortingAction;
    applyCategory: (category: string) => IApplyCategoryAction;
    setPopupStatus: React.Dispatch<React.SetStateAction<boolean>>;
    setCardId: React.Dispatch<React.SetStateAction<number>>;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
    shoppingCart: IShoppingCartSettings;
    addToCart: (cardId: number) => IAddToCartAction;
    removeFromCart: (cardId: number) => IRemoveFromCartAction;
}

export interface IRangeState {
    minValue: number;
    maxValue: number;
}

export interface IRangeContext {
    title: string;
    min: number;
    max: number;
    state: IRangeState;
    onChange: (state: IRangeState) => void;
}

export interface IModalState {
    number: number;
    isModalOpen: boolean;
}

export interface IModalContext {
    isModalOpen: boolean;
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
