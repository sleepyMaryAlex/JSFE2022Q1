import './Card.css';
import React from 'react';
import { ICardContext } from '../../types/types';

const Card = (props: ICardContext) => {
    const openPopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        if (!target.classList.contains('card__plus')) {
            props.setPopupStatus(true);
            props.setCardId(props.card.id);
        }
    };

    const addToCart = () => {
        if (props.shoppingCart.items.includes(props.card.id)) {
            props.removeFromCart(props.card.id);
        } else {
            if (props.shoppingCart.items.length === 20) {
                props.setModalStatus(true);
            } else {
                props.addToCart(props.card.id);
            }
        }
    };

    return (
        <div className="card" onClick={openPopup}>
            <div className="card__container">
                <img className="card__image" src={props.card.image} alt="outfit" />
                <div
                    className={`card__plus${
                        props.shoppingCart.items.includes(props.card.id) ? ' card__plus_active' : ''
                    }`}
                    onClick={addToCart}
                >
                    +
                </div>
            </div>
            <h5 className="card__title">{props.card.title}</h5>
            <div className="card__price">{props.card.price}</div>
        </div>
    );
};

export default Card;
