import './SortMenu.css';
import React from 'react';
import { ISortMenuContext, ISortSettings } from '../../types/types';
import closeButton from './../../assets/icons/close-button.svg';

const SortMenu = (props: ISortMenuContext) => {
    const [settings, setSettings] = React.useState<ISortSettings | null>(props.sortSettings);

    const sortMenuRef = React.useRef<HTMLDivElement>(null);
    const closeButtonRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (props.isMenuOpen) {
            sortMenuRef.current?.classList.add('menu__active');
            closeButtonRef.current?.classList.add('close-button_fixed');
        } else {
            sortMenuRef.current?.classList.remove('menu__active');
            closeButtonRef.current?.classList.remove('close-button_fixed');
        }
    }, [props.isMenuOpen]);

    const updateSettings = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const field = target.dataset.field as string;
        const order = target.dataset.order as string;
        setSettings({ field: field, order: order });
    };

    const applySorting = () => {
        if (settings) {
            localStorage.setItem('sortSettings', JSON.stringify(settings));
            props.setMenuStatus(false);
            props.applySorting(settings);
        }
    };

    const resetAllSettings = () => {
        props.setMenuStatus(false);
        props.resetAllSettings();
    };

    return (
        <div className="menu" ref={sortMenuRef}>
            <img
                className="menu__close-button"
                src={closeButton}
                alt="close"
                onClick={() => props.setMenuStatus(false)}
                ref={closeButtonRef}
            />
            <div className="logo menu__logo" onClick={() => location.reload()}>
                <h1 className="logo__title">H&amp;M</h1>
                <p className="logo__subtitle">BY HUCHKOVA MARIA</p>
            </div>
            <p className="menu__new-collection">NEW COLLECTION</p>
            <div className="sorting">
                <div className="sorting__alphabet">
                    <h5 className="alphabet__title">SORT ALPHABETICALLY</h5>
                    <div className="alphabet__container">
                        <div
                            className={`alphabet__item${
                                settings?.field === 'title' && settings?.order === 'asc' ? ' item_active' : ''
                            }${settings?.field !== 'title' && settings?.field !== null ? ' item_inactive' : ''}`}
                            onClick={updateSettings}
                            data-field="title"
                            data-order="asc"
                        >
                            FROM A TO Z
                        </div>
                        <div
                            className={`alphabet__item${
                                settings?.field === 'title' && settings?.order === 'desc' ? ' item_active' : ''
                            }${settings?.field !== 'title' && settings?.field !== null ? ' item_inactive' : ''}`}
                            onClick={updateSettings}
                            data-field="title"
                            data-order="desc"
                        >
                            FROM Z TO A
                        </div>
                    </div>
                </div>
                <div className="sorting__year">
                    <h5 className="year__title">SORT BY RELEASE YEAR</h5>
                    <div className="year__container">
                        <div
                            className={`year__item${
                                settings?.field === 'year' && settings?.order === 'asc' ? ' item_active' : ''
                            }${settings?.field !== 'year' && settings?.field !== null ? ' item_inactive' : ''}`}
                            onClick={updateSettings}
                            data-field="year"
                            data-order="asc"
                        >
                            FROM 2018 TO 2022
                        </div>
                        <div
                            className={`year__item${
                                settings?.field === 'year' && settings?.order === 'desc' ? ' item_active' : ''
                            }${settings?.field !== 'year' && settings?.field !== null ? ' item_inactive' : ''}`}
                            onClick={updateSettings}
                            data-field="year"
                            data-order="desc"
                        >
                            FROM 2022 TO 2018
                        </div>
                    </div>
                </div>
            </div>
            <div className="sorting__buttons">
                <div className="buttons__apply" onClick={applySorting}>
                    APPLY
                </div>
                <div className="buttons__reset-settings" onClick={resetAllSettings}>
                    RESET ALL SETTINGS
                </div>
            </div>
        </div>
    );
};

export default SortMenu;
