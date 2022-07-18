import './Popup.css';
import { IPopupContext } from '../../types/types';
import cards from '../../app/cards';
import React from 'react';

const Popup = (props: IPopupContext) => {
    const selectedCard = cards.find((card) => card.id === props.cardId);
    const popupRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.isPopupOpen) {
            document.body.classList.add('body_active');
            popupRef.current?.classList.add('popup_active');
        } else {
            document.body.classList.remove('body_active');
            popupRef.current?.classList.remove('popup_active');
        }
    }, [props.isPopupOpen]);

    const closePopup = () => {
        props.setPopupStatus(false);
    };

    return (
        <div className="popup" ref={popupRef}>
            <div className="popup__addition">
                <div className="addition__category">
                    <h5 className="category__title">CATEGORY</h5>
                    <span className="category__span">{selectedCard?.category.toUpperCase()}</span>
                </div>
                <div className="addition__color">
                    <h5 className="color__title">COLOR</h5>
                    <span className="color__span">{selectedCard?.color.join(' ').toUpperCase()}</span>
                </div>
                <div className="addition__size">
                    <h5 className="size__title">SIZES</h5>
                    <span className="size__span">{selectedCard?.size.join(' ')}</span>
                </div>
                <div className="addition__brand">
                    <h5 className="brand__title">BRAND</h5>
                    <span className="brand__span">{selectedCard?.brand.toUpperCase()}</span>
                </div>
                <div className="addition__year">
                    <h5 className="year__title">RELEASE YEAR</h5>
                    <span className="year__span">{selectedCard?.year}</span>
                </div>
                <div className="addition__quantity">
                    <h5 className="quantity__title">QUANTITY IN STOCK</h5>
                    <span className="quantity__span">{selectedCard?.quantity}</span>
                </div>
            </div>
            <img className="popup__image" src={selectedCard?.image} alt="outfit" />
            <div className="popup__info">
                <img
                    className="info__close-button"
                    src="assets/icons/close-button.svg"
                    alt="close"
                    onClick={closePopup}
                />
                <h5 className="info__title">{selectedCard?.title}</h5>
                <div className="info__description">{selectedCard?.description.toUpperCase()}</div>
                <div className="info__price">{selectedCard?.price}</div>
                <div className="info__popular">{selectedCard?.popular ? 'POPULAR' : ''}</div>
            </div>
        </div>
    );
};

export default Popup;
