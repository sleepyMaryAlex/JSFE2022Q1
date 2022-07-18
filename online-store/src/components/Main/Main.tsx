import './Main.css';
import Card from '../Card/Card';
import { IMainContext } from '../../types/types';

const Main = (props: IMainContext) => {
    if (props.cards.length === 0) {
        return (
            <main className="main">
                <p className="message">NOTHING FOUND</p>
            </main>
        );
    } else {
        return (
            <main className="main">
                {props.cards.map((item) => (
                    <Card
                        card={item}
                        setPopupStatus={props.setPopupStatus}
                        setCardId={props.setCardId}
                        setModalStatus={props.setModalStatus}
                        shoppingCart={props.shoppingCart}
                        addToCart={props.addToCart}
                        removeFromCart={props.removeFromCart}
                    />
                ))}
            </main>
        );
    }
};

export default Main;
