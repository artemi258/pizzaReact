import classNames from 'classnames';
import { useState } from 'react';

import '../drinks.scss';
import '../../../../style/style.scss';

const DrinksItem = ({ img, title, liters, price }) => {

    const [active, setActive] = useState("0.5 л");
    const [changePrice, setChangePrice] = useState(liters[0].price);
    const content = () => {
                switch (Array.isArray(liters)) {
                    case true:
         return <div className="drinks__item">
                        <div className="drinks__img"><img src={img} alt={title} /></div>
                        <div className="drinks__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="drinks__liters">
                                {liters.map(({liter, price}) => {
                                        const classes = classNames("drinks__liters-item", {"drinks__liters-active": active === liter});
                                    return <div onClick={() => {
                                        setChangePrice(price);
                                        setActive(liter);
                                    }} key={liter} className={classes}>{liter}</div>
                                })}
                            </div>
                            <div className="drinks__bottom"><button className="button button__products">Выбрать</button><span className="drinks__price fade" key={Math.random()}>{changePrice} &#8381;</span></div>
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