import './Filters.css';
import React from 'react';
import Range from './Range/Range';
import { IFiltersContext, IRangeState } from '../../types/types';
import closeButton from './../../assets/icons/close-button.svg';

const Filters = (props: IFiltersContext) => {
    const [priceState, setPriceState] = React.useState<IRangeState>(props.filtersSettings.price);
    const [quantityState, setQuantityState] = React.useState<IRangeState>(props.filtersSettings.quantity);
    const [yearState, setYearState] = React.useState<IRangeState>(props.filtersSettings.year);
    const [sizeState, setSizeState] = React.useState(props.filtersSettings.sizes);
    const [colorState, setColorState] = React.useState(props.filtersSettings.colors);
    const [brandState, setBrandState] = React.useState(props.filtersSettings.brands);
    const [popularState, setPopularState] = React.useState(props.filtersSettings.popular);

    const filtersRef = React.useRef<HTMLDivElement>(null);
    const filtersCloseButtonRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (props.isFiltersOpen) {
            document.body.classList.add('body_active');
            document.body.classList.add('body_overlay');
            filtersRef.current?.classList.add('filters_active');
            filtersCloseButtonRef.current?.classList.add('close-button_fixed');
        } else {
            document.body.classList.remove('body_active');
            document.body.classList.remove('body_overlay');
            filtersRef.current?.classList.remove('filters_active');
            filtersCloseButtonRef.current?.classList.remove('close-button_fixed');
        }
    }, [props.isFiltersOpen]);

    const updateSizeStyle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const size = target.dataset.size as string;
        if (sizeState.includes(size)) {
            setSizeState(sizeState.filter((item) => item !== size));
        } else {
            setSizeState([...sizeState, size]);
        }
    };

    const updateBrandStyle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const brand = target.dataset.brand as string;
        if (brandState.includes(brand)) {
            setBrandState(brandState.filter((item) => item !== brand));
        } else {
            setBrandState([...brandState, brand]);
        }
    };

    const updatePopularStyle = () => {
        if (popularState) {
            setPopularState(false);
        } else {
            setPopularState(true);
        }
    };

    const updateColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const color = target.dataset.color as string;

        if (colorState.includes(color)) {
            setColorState(colorState.filter((item) => item !== color));
        } else {
            setColorState([...colorState, color]);
        }
    };

    const resetFilters = () => {
        const filtersSettings = {
            sizes: [],
            colors: [],
            price: { minValue: 39, maxValue: 199 },
            brands: [],
            popular: false,
            quantity: { minValue: 0, maxValue: 30 },
            year: { minValue: 2018, maxValue: 2022 },
        };

        setSizeState(filtersSettings.sizes);
        setColorState(filtersSettings.colors);
        setPriceState(filtersSettings.price);
        setBrandState(filtersSettings.brands);
        setPopularState(filtersSettings.popular);
        setQuantityState(filtersSettings.quantity);
        setYearState(filtersSettings.year);

        localStorage.removeItem('filtersSettings');

        props.setFiltersStatus(false);

        props.applyFilters(filtersSettings);
    };

    const applyFilters = () => {
        const settings = {
            sizes: sizeState,
            colors: colorState,
            price: priceState,
            brands: brandState,
            popular: popularState,
            quantity: quantityState,
            year: yearState,
        };

        localStorage.setItem('filtersSettings', JSON.stringify(settings));

        props.applyFilters(settings);

        props.setFiltersStatus(false);
    };

    return (
        <div className="filters" ref={filtersRef}>
            <img
                className="filters__close-button"
                src={closeButton}
                alt="close"
                ref={filtersCloseButtonRef}
                onClick={() => props.setFiltersStatus(false)}
            />
            <div className="filters__size">
                <h5 className="size__title">SIZE</h5>
                <div className="size__container">
                    <div
                        className={`size__item${sizeState.includes('XS') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="XS"
                    >
                        XS
                    </div>
                    <div
                        className={`size__item${sizeState.includes('S') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="S"
                    >
                        S
                    </div>
                    <div
                        className={`size__item${sizeState.includes('M') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="M"
                    >
                        M
                    </div>
                    <div
                        className={`size__item${sizeState.includes('L') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="L"
                    >
                        L
                    </div>
                    <div
                        className={`size__item${sizeState.includes('XL') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="XL"
                    >
                        XL
                    </div>
                    <div
                        className={`size__item${sizeState.includes('XXL') ? ' item_active' : ''}`}
                        onClick={updateSizeStyle}
                        data-size="XXL"
                    >
                        XXL
                    </div>
                </div>
            </div>
            <div className="filters__color">
                <h5 className="color__title">COLOR</h5>
                <div className="color__container">
                    <div className="color__item">
                        <div
                            className={`color__item_khaki color-template${
                                colorState.includes('KHAKI') ? ' color__item_active' : ''
                            }`}
                            onClick={updateColor}
                            data-color="KHAKI"
                        ></div>
                        <div className="color__name" onClick={updateColor} data-color="KHAKI">
                            KHAKI
                        </div>
                    </div>
                    <div className="color__item">
                        <div
                            className={`color__item_sand color-template${
                                colorState.includes('SAND') ? ' color__item_active' : ''
                            }`}
                            onClick={updateColor}
                            data-color="SAND"
                        ></div>
                        <div className="color__name" onClick={updateColor} data-color="SAND">
                            SAND
                        </div>
                    </div>
                    <div className="color__item">
                        <div
                            className={`color__item_white color-template${
                                colorState.includes('WHITE') ? ' color__item_active' : ''
                            }`}
                            onClick={updateColor}
                            data-color="WHITE"
                        ></div>
                        <div className="color__name" onClick={updateColor} data-color="WHITE">
                            WHITE
                        </div>
                    </div>
                    <div className="color__item">
                        <div
                            className={`color__item_black color-template${
                                colorState.includes('BLACK') ? ' color__item_active' : ''
                            }`}
                            onClick={updateColor}
                            data-color="BLACK"
                        ></div>
                        <div className="color__name" onClick={updateColor} data-color="BLACK">
                            BLACK
                        </div>
                    </div>
                    <div className="color__item">
                        <div
                            className={`color__item_multi-colored color-template${
                                colorState.includes('MULTI-COLORED') ? ' color__item_active' : ''
                            }`}
                            onClick={updateColor}
                            data-color="MULTI-COLORED"
                        ></div>
                        <div className="color__name" onClick={updateColor} data-color="MULTI-COLORED">
                            MULTI-COLORED
                        </div>
                    </div>
                </div>
            </div>
            <div className="filters__price">
                <h5 className="price__title">PRICE</h5>
                <Range title="price" min={39} max={199} state={priceState} onChange={(state) => setPriceState(state)} />
            </div>
            <div className="filters__brand">
                <h5 className="brand__title">BRAND</h5>
                <div className="brand__container">
                    <div
                        className={`brand__item${brandState.includes('ZARA') ? ' item_active' : ''}`}
                        onClick={updateBrandStyle}
                        data-brand="ZARA"
                    >
                        ZARA
                    </div>
                    <div
                        className={`brand__item${brandState.includes('MANGO') ? ' item_active' : ''}`}
                        onClick={updateBrandStyle}
                        data-brand="MANGO"
                    >
                        MANGO
                    </div>
                    <div
                        className={`brand__item${brandState.includes('H&M') ? ' item_active' : ''}`}
                        onClick={updateBrandStyle}
                        data-brand="H&amp;M"
                    >
                        H&amp;M
                    </div>
                </div>
            </div>
            <div className="filters__popular">
                <h5 className="popular__title">ONLY POPULAR</h5>
                <div className={`popular__item${popularState ? ' item_active' : ''}`} onClick={updatePopularStyle}>
                    YES
                </div>
            </div>
            <div className="filters__quantity">
                <h5 className="quantity__title">QUANTITY IN STOCK</h5>
                <Range
                    title="quantity"
                    min={0}
                    max={30}
                    state={quantityState}
                    onChange={(state) => setQuantityState(state)}
                />
            </div>
            <div className="filters__release-year">
                <h5 className="release-year__title">RELEASE YEAR</h5>
                <Range
                    title="release-year"
                    min={2018}
                    max={2022}
                    state={yearState}
                    onChange={(state) => setYearState(state)}
                />
            </div>
            <div className="filters__buttons">
                <div className="buttons__results" onClick={applyFilters}>
                    SHOW RESULTS
                </div>
                <div className="buttons__reset" onClick={resetFilters}>
                    RESET FILTERS
                </div>
            </div>
        </div>
    );
};

export default Filters;
