import { useDispatch } from 'react-redux';
import { addProduct } from "../../../popups/popupBasket/popupBasketSlice";

import '../sauces.scss';
import '../../../../style/style.scss';

const SaucesItem = ({ img, title, liters, price, product }) => {
    const dispatch = useDispatch();

    const content = () => {
         return <div className="sauces__item">
                        <div className="sauces__img"><img src={img} alt={title} /></div>
                        <div className="sauces__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="sauces__liters">{liters}</div>
                            <div className="sauces__bottom"><button onClick={() => dispatch(addProduct(
                                [{...product, quantity: 1}]
                            ))} className="button button__products">Выбрать</button><span className="sauces__price">{price} &#8381;</span></div>
                        </div>
                </div>
    }
    return (
        <>
            {content()}
        </>
    )
}

export default SaucesItem;