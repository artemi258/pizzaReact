import { Link, NavLink } from 'react-router-dom';

import fire from './icon/Fire.png';
import pizza from './icon/Pizza.png';
import sushi from './icon/Sushi.png';
import drink from './icon/Drink.png';
import snacks from './icon/Snacks.png';
import combo from './icon/Combo.png';
import dessert from './icon/Dessert.png';
import sauce from './icon/Sauce.png';

import './navMenu.scss';
import '../../style/variables.scss';

    const NavMenu = () => {

        const active = ({ isActive }) => ( isActive ? { color: '#FF7010', borderBottom: '#FF7010 2px solid' } : {})
        return (
            <nav className='navMenu container'>
                <ul className='navMenu__menu'>
                    <li className="navMenu__list">
                        <NavLink to={'/'} style={active}>
                            <div className="navMenu__img"><img src={fire} alt="fire" /></div>
                            <span>Акции</span>
                        </NavLink>
                    </li>
                    <li className="navMenu__list">
                        <NavLink to={'/pizza'} style={active}>
                            <div className="navMenu__img"><img src={pizza} alt="pizza" /></div>
                            <span>Пицца</span>
                        </NavLink>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={sushi} alt="sushi" /></div>
                            <span>Суши</span>
                        </Link>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={drink} alt="drink" /></div>
                            <span>Напитки</span>
                        </Link>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={snacks} alt="snacks" /></div>
                            <span>Закуски</span>
                        </Link>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={combo} alt="combo" /></div>
                            <span>Комбо</span>
                        </Link>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={dessert} alt="dessert" /></div>
                            <span>Десерты</span>
                        </Link>
                    </li>
                    <li className="navMenu__list">
                        <Link to={'/'}>
                            <div className="navMenu__img"><img src={sauce} alt="sauce" /></div>
                            <span>Соусы</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }

export default NavMenu;