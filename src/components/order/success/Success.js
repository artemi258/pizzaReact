import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { cleaningBasket, addTotalPrice } from "../../popups/popupBasket/popupBasketSlice";


import img from './success.png';

import './success.scss';

const Success = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(cleaningBasket());
        dispatch(addTotalPrice(0));
        window.scrollTo(0, 101);
        // eslint-disable-next-line
    }, []);
    return <div className="success container">
        <div className="success__wrapper">
        <div className="success__img"><img src={img} alt="success" /></div>
            <h2 className="success__title">Заказ №310202 принят</h2>
            <div className="success__info">
                <h6>Спасибо за заказ!</h6>
                <p className="success__descr">Примерное время доставки 45 минут. Статус отследить можно нажав на кнопку ниже</p>
            </div>
                <button className="button button__products">Отследить заказ</button>
            </div>
        </div>     
}

export default Success;