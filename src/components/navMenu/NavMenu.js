import { NavLink } from 'react-router-dom';

// import fire from './icon/Fire.png';
import pizza from './icon/Pizza.png';
import drink from './icon/Drink.png';
import snacks from './icon/Snacks.png';
import dessert from './icon/Dessert.png';
import sauce from './icon/Sauce.png';

import './navMenu.scss';
import '../../style/variables.scss';

    const NavMenu = () => {

        const active = ({ isActive }) => ( isActive ? "navMenu__list navMenu__active" : "navMenu__list");
        return (
            <nav className='navMenu container'>
                <div className='navMenu__menu'>
                    <NavLink className={active} to={'/pizzaWeb'}>
                        <div>
                            <div className="navMenu__img"><img src={pizza} alt="pizza" /></div>
                            <span>Пицца</span>
                        </div>
                    </NavLink>
                    <NavLink className={active} to={'/pizzaWeb/drinks'}>
                        <div>
                            <div className="navMenu__img"><img src={drink} alt="drink" /></div>
                            <span>Напитки</span>
                        </div>
                    </NavLink>
                    <NavLink className={active} to={'/pizzaWeb/snacks'}>
                        <div>
                            <div className="navMenu__img"><img src={snacks} alt="snacks" /></div>
                            <span>Закуски</span>
                        </div>
                    </NavLink>
                    <NavLink className={active} to={'/pizzaWeb/desserts'}>
                        <div>
                            <div className="navMenu__img"><img src={dessert} alt="desserts" /></div>
                            <span>Десерты</span>
                        </div>
                    </NavLink>
                    <NavLink className={active} to={'/pizzaWeb/sauces'}>
                        <div>
                            <div className="navMenu__img"><img src={sauce} alt="sauces" /></div>
                            <span>Соусы</span>
                        </div>
                    </NavLink>
                </div>
            </nav>
        )
    }

export default NavMenu;