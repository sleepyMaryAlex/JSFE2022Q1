import { IShoppingCartContext } from '../../types/types';
import './ShoppingCart.css';

const ShoppingCart = (props: IShoppingCartContext) => {
    return (
        <div className="shopping__container">
            <img className="shopping__image" src="assets/icons/shopping-bag.png" alt="bag" />
            <span className="shopping__number">{props.shoppingCart.items.length}</span>
        </div>
    );
};

export default ShoppingCart;
