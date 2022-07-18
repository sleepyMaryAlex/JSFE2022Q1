import './App.css';
import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import SortMenu from './components/SortMenu/SortMenu';
import Filters from './components/Filters/Filters';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import {
    applyCategory,
    applySorting,
    applyFilters,
    resetAllSettings,
    addToCart,
    removeFromCart,
    applySearchString,
} from './app/actions';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { IAppContext, ICard, IFiltersSettings, IShoppingCartSettings, ISortSettings } from './types/types';
import Popup from './components/Popup/Popup';
import Modal from './components/Modal/Modal';

const App = (props: IAppContext) => {
    const [isMenuOpen, setMenuStatus] = React.useState(false);
    const [isFiltersOpen, setFiltersStatus] = React.useState(false);
    const [isPopupOpen, setPopupStatus] = React.useState(false);
    const [isModalOpen, setModalStatus] = React.useState(false);
    const [cardId, setCardId] = React.useState(0);

    return (
        <div className="wrapper">
            <Popup isPopupOpen={isPopupOpen} setPopupStatus={setPopupStatus} cardId={cardId} />
            <Modal isModalOpen={isModalOpen} setModalStatus={setModalStatus} />
            <Header
                isMenuOpen={isMenuOpen}
                setMenuStatus={setMenuStatus}
                isFiltersOpen={isFiltersOpen}
                setFiltersStatus={setFiltersStatus}
                applyCategory={props.applyCategory}
                category={props.category}
                searchString={props.searchString}
                applySearchString={props.applySearchString}
            />
            <SortMenu
                isMenuOpen={isMenuOpen}
                setMenuStatus={setMenuStatus}
                applySorting={props.applySorting}
                sortSettings={props.sortSettings}
                resetAllSettings={props.resetAllSettings}
            />
            <Filters
                isFiltersOpen={isFiltersOpen}
                setFiltersStatus={setFiltersStatus}
                applyFilters={props.applyFilters}
                filtersSettings={props.filtersSettings}
            />
            <Main
                {...props}
                setPopupStatus={setPopupStatus}
                setCardId={setCardId}
                setModalStatus={setModalStatus}
                shoppingCart={props.shoppingCart}
                addToCart={props.addToCart}
                removeFromCart={props.removeFromCart}
            />
            <ShoppingCart shoppingCart={props.shoppingCart} />
            <Footer />
        </div>
    );
};

function mapStoreToProps(store: Map<string, unknown>) {
    return {
        cards: store.get('cards') as ICard[],
        shoppingCart: store.get('shoppingCart') as IShoppingCartSettings,
        filtersSettings: store.get('filtersSettings') as IFiltersSettings,
        category: store.get('category') as string,
        sortSettings: store.get('sortSettings') as ISortSettings,
        searchString: store.get('searchString') as string,
    };
}

export const AppView = connect(mapStoreToProps, {
    applySorting,
    applyCategory,
    applyFilters,
    resetAllSettings,
    addToCart,
    removeFromCart,
    applySearchString,
})(App);
