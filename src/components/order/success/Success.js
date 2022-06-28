import { useEffect } from 'react';

import img from './success.png';

import './success.scss';

const Success = () => {

    useEffect(() => {
        window.scrollTo(0, 565);
    }, []);
    return <div className="success container">
        <div className="success__wrapper">
        <div className="success__img"><img src={img} alt="success" /></div>
            <h2 className="success__title">Заказ №310202 принят</h2>
            <div className="success__info">
                <h6>Спасибо за заказ!</h6>
                <p className="success__descr">Примерное время доставки 45 минут. Статус отследить можно нажав на кнопку ниже</p>
            </div>
                <buttom className="button button__products">Отследить заказ</buttom>
            </div>
        </div>     
}

export default Success;