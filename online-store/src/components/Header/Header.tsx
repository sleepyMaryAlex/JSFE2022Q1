import './Header.css';
import React from 'react';
import Categories from '../Categories/Categories';
import { IHeaderContext } from '../../types/types';
import burger from './../../assets/icons/burger-menu.svg';
import closeButton from './../../assets/icons/close-button.svg';

const Header = (props: IHeaderContext) => {
    const headerLogoRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (props.isMenuOpen) {
            document.body.classList.add('body_active');
            document.body.classList.add('body_overlay');
            headerLogoRef.current?.classList.add('header__logo_transparent');
        } else {
            document.body.classList.remove('body_active');
            document.body.classList.remove('body_overlay');
            headerLogoRef.current?.classList.remove('header__logo_transparent');
        }
    }, [props.isMenuOpen]);

    const searchItems = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        props.applySearchString(target.value.trim());
    };

    const clearSearchString = () => {
        (searchInputRef.current as HTMLInputElement).value = '';
        props.applySearchString('');
    };

    return (
        <header className="header">
            <img className="header__img" src={burger} alt="burger-menu" onClick={() => props.setMenuStatus(true)} />
            <div className="logo header__logo" onClick={() => location.reload()} ref={headerLogoRef}>
                <h1 className="logo__title">H&amp;M</h1>
                <p className="logo__subtitle">BY HUCHKOVA MARIA</p>
            </div>
            <Categories applyCategory={props.applyCategory} category={props.category} />
            <div className="header__input-container">
                <input
                    type="text"
                    className="header__input"
                    placeholder="SEARCH"
                    spellCheck="false"
                    autoComplete="off"
                    autoFocus
                    defaultValue={props.searchString}
                    onInput={searchItems}
                    ref={searchInputRef}
                />
                <img
                    className={`input__close-button${props.searchString ? ' input__close-button_active' : ''}`}
                    src={closeButton}
                    alt="close"
                    onClick={clearSearchString}
                />
            </div>
            <div className="header__filters" onClick={() => props.setFiltersStatus(true)}>
                FILTERS
            </div>
        </header>
    );
};

export default Header;
