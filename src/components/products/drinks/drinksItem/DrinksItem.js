import classNames from 'classnames';
import { useState } from 'react';

import '../drinks.scss';
import '../../../../style/style.scss';

const DrinksItem = ({ img, title, liters, price }) => {

    const [active, setActive] = useState("0.5 л");
    const [backgroundActive, getBackgroundActive] = useState(0);
    const [changePrice, setChangePrice] = useState(liters[0].price);
    console.log(backgroundActive)
    const content = () => {
                switch (Array.isArray(liters)) {
                    case true:
         return <div className="drinks__item">
                        <div className="drinks__img"><img src={img} alt={title} /></div>
                        <div className="drinks__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="drinks__liters">
                                <div className="drinks__active" style={{left: `${backgroundActive}px`}}></div>
                                {liters.map(({liter, price}) => {
                                        const classes = classNames("drinks__liters-item", {"drinks__liters-active": active === liter});
                                    return <div onClick={e => {
                                        setChangePrice(price);
                                        setActive(liter);
                                        getBackgroundActive(e.target.offsetLeft)
                                    }} key={liter} className={classes}>{liter}</div>
                                })}
                            </div>
                            <div className="drinks__bottom"><button className="button button__products">Выбрать</button><span className="drinks__price" key={Math.random()}>{changePrice} &#8381;</span></div>
                        </div>
                </div>
                    case false:
         return <div className="drinks__item">
                        <div className="drinks__img"><img src={img} alt={title} /></div>
                        <div className="drinks__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="drinks__liters drinks__liters-noChange">{liters}</div>
                            <div className="drinks__bottom"><button className="button button__products">Выбрать</button><span className="drinks__price">{price} &#8381;</span></div>
                        </div>
                </div>
                    default:
                        break;
                }
    }
    return (
        <>
            {content()}
        </>
    )
}

export default DrinksItem;