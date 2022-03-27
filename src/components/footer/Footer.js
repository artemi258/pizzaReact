import pizza from '../../icon/pizza.png';
import facebook from '../../icon/facebook.png';
import instagram from '../../icon/instagram.png';
import phone from '../../icon/phone.png';
import nav from '../../icon/nav.png';

import './footer.scss';


const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__wrapper container">
                <div className="footer__logo">
                    <div className="footer__pizza">
                        <div className="footer__img"><img src={pizza} alt="pizza" /></div>
                        <span>Куда пицца</span>
                    </div>
                    <div className="footer__copyright">© Copyright 2021 — Куда Пицца</div>
                </div>
                <ul className="footer__info">
                    <span>Куда пицца</span>
                    <li><a href="#">О компании</a></li>
                    <li><a href="#">Пользовательское соглашение</a></li>
                    <li><a href="#">Условия гарантии</a></li>
                </ul>
                <ul className="footer__help">
                    <span>Помощь</span>
                    <li><a href="#">Ресторан</a></li>
                    <li><a href="#">Контакты</a></li>
                    <li><a href="#">Поддержка</a></li>
                    <li><a href="#">Отследить заказ</a></li>
                </ul>
                <div className="footer__contacts">
                            <span>Контакты</span>
                            <div className="footer__contacts-item">
                                <div className="footer__contacts-icon"><img src={phone} alt="phone" /></div>
                                <a href="tel:+79509999999" target="_blank" rel='noreferrer'>+7 (950) 999-99-99</a>
                            </div>
                            <div className="footer__contacts-item">
                                <div className="footer__contacts-icon"><img src={nav} alt="nav" /></div>
                                <address>Москва, ул. Юных Ленинцев, д.99</address>
                            </div>
                            <div className="footer__contacts-item">
                                <div className="footer__contacts-icon"><img src={facebook} alt="facebook" /></div>
                                <a href="https://www.facebook.com" target="_blank" rel='noreferrer'>Facebok</a>
                            </div>
                            <div className="footer__contacts-item">
                                <div className="footer__contacts-icon"><img src={instagram} alt="instagram" /></div>
                                <a href="https://instagram.com/" target="_blank" rel='noreferrer'>Instagram</a>
                            </div>
                        </div>
            </div>
        </footer>
    )
}

export default Footer;