import './navMenu.scss';

import fire from './icon/Fire.png';
import pizza from './icon/Pizza.png';
import sushi from './icon/Sushi.png';
import drink from './icon/Drink.png';
import snacks from './icon/Snacks.png';
import combo from './icon/Combo.png';
import dessert from './icon/Dessert.png';
import sauce from './icon/Sauce.png';

    const NavMenu = () => {
        return (
            <nav className='navMenu container'>
                <ul className='navMenu__menu'>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={fire} alt="fire" /></div>
                        <span>Акции</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={pizza} alt="pizza" /></div>
                        <span>Пицца</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={sushi} alt="sushi" /></div>
                        <span>Суши</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={drink} alt="drink" /></div>
                        <span>Напитки</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={snacks} alt="snacks" /></div>
                        <span>Закуски</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={combo} alt="combo" /></div>
                        <span>Комбо</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={dessert} alt="dessert" /></div>
                        <span>Десерты</span>
                    </li>
                    <li className="navMenu__list">
                        <div className="navMenu__img"><img src={sauce} alt="sauce" /></div>
                        <span>Соусы</span>
                    </li>
                </ul>
            </nav>
        )
    }

export default NavMenu;