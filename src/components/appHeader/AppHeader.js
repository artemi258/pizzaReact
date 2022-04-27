import { changePopupActivation } from '../popups/popupBasket/popupBasketSlice';
import { useDispatch, useSelector } from 'react-redux';

import pizza from '../../icon/pizza.png';
import account from './icon/account.png';
import basket from './icon/basket.png';
import facebook from '../../icon/facebook.png';
import instagram from '../../icon/instagram.png';
import phone from '../../icon/phone.png';
import nav from '../../icon/nav.png';

import './appHeader.scss';
import '../../style/style.scss';
import '../../style/button.scss';


    const AppHeader = () => {

        const {totalPrice} = useSelector(state => state.popupBasket)
        const dispatch = useDispatch();

        return (
            <section className="appHeader">
                <div className="appHeader__wrapper container">
                    <div className="appHeader__top">
                        <div className="appHeader__top-item">
                        Среднее время доставки*: <span>00:24:19</span>
                        </div>
                        <div className="appHeader__top-item">
                        Время работы: с 11:00 до 23:00
                            <div className="appHeader__top-account">
                                <div className="appHeader__top-icon">
                                    <img src={account} alt="account" />
                                </div>
                                <span>Войти в аккаунт</span>
                            </div>
                        </div>
                    </div>
                    <div className="appHeader__divinder"></div>
                    <div className="appHeader__bottom">
                        <div className="appHeader__bottom-logo">
                            <div className="appHeader__bottom-img">
                                <img src={pizza} alt="pizza" />
                            </div>
                            <span>Куда пицца</span>
                        </div>
                        <div className="appHeader__bottom-contacts">
                            <span>Контакты:</span>
                            <div className="appHeader__bottom-item">
                                <div className="appHeader__bottom-icon"><img src={phone} alt="phone" /></div>
                                <a href="tel:+79509999999" target="_blank" rel='noreferrer'>+7 (950) 999-99-99</a>
                            </div>
                            <div className="appHeader__bottom-item">
                                <div className="appHeader__bottom-icon"><img src={nav} alt="nav" /></div>
                                <address>Москва, ул. Юных Ленинцев, д.99</address>
                            </div>
                            <div className="appHeader__bottom-item">
                                <div className="appHeader__bottom-icon"><img src={facebook} alt="facebook" /></div>
                                <a href="https://www.facebook.com" target="_blank" rel='noreferrer'>Facebok</a>
                            </div>
                            <div className="appHeader__bottom-item">
                                <div className="appHeader__bottom-icon"><img src={instagram} alt="instagram" /></div>
                                <a href="https://instagram.com/" target="_blank" rel='noreferrer'>Instagram</a>
                            </div>
                        </div>
                        <button onClick={() => dispatch(changePopupActivation(true))} className="button button__basket appHeader__bottom-basket">
                            <div className="appHeader__bottom-basket-icon">
                                <img src={basket} alt="basket" />
                            </div>
                            <span>{totalPrice} ₽</span>
                        </button>
                    </div>
                </div>
            </section>
        )
    }

export default AppHeader;