import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { addActiveProduct, changePopupActivation } from "./popupProductSlice";

import ingredients from "./ingredients";

import CustomScroll from 'react-custom-scroll';
import classNames from "classnames";

import './popupProduct.scss'
import '../../style/button.scss';
import '../../style/style.scss';
import '../../../node_modules/react-custom-scroll/dist/customScroll.css';

const PopupProduct = () => {

    const dispatch = useDispatch();

    const {popupActivation, activeProduct} = useSelector(state => state.popupProduct)
    const [activeDough, setActiveDough] = useState('Traditional');
    const [activeSize, setActiveSize] = useState('20 см');
    const [backgroundActiveDough, getBackgroundActiveDough] = useState(0);
    const [backgroundActiveSize, getBackgroundActiveSize] = useState(0);

    const onChangeActive = (active, difference) => {
        if (difference === 'dough') {
            setActiveDough(active);
        } else {
            setActiveSize(active);
        }
    }

    const closePopup = () => {
        dispatch(changePopupActivation(false));
    }
console.log(popupActivation)
    return (
        <CSSTransition in={popupActivation} timeout={500} classNames="fadeBackgroundFilter">
        <div className="popupProduct">
            <div className="popupProduct__wrapper">
            <div onClick={closePopup} className="popupProduct__close"></div>
                <div className="popupProduct__img">
                    <img src={ingredients[0].pictures} alt="" />
                </div>
                    <div className="popupProduct__content">
                        <CustomScroll heightRelativeToParent="100%">
                            <h2 className="popupProduct__title">Пепперони по-деревенски</h2>
                            <div className="popupProduct__description">
                            Курица, Лук, Перец Халапеньо, Сыр Моцарелла, Томатный соу...
                            </div>
                            <div className="popupProduct__buttons">
                            <div className="popupProduct__buttons-dough">
                                <div className="popupProduct__buttons-dough-active" style={{left: `${backgroundActiveDough}px`}}></div>
                                <div className={classNames({'popupProduct__buttons-activeColor': activeDough === 'Traditional'})} 
                                onClick={(e) => {onChangeActive('Traditional', 'dough'); getBackgroundActiveDough(e.target.offsetLeft)}}>
                                    Традиционное</div>
                                <div className={classNames({'popupProduct__buttons-activeColor': activeDough === 'Thin'})} 
                                onClick={(e) => {onChangeActive('Thin', 'dough'); getBackgroundActiveDough(e.target.offsetLeft)}}>
                                    Тонкое</div>
                            </div>
                            <div className="popupProduct__buttons-size">
                            <div className="popupProduct__buttons-size-active" style={{left: `${backgroundActiveSize}px`}}></div>
                                <div className={classNames({'popupProduct__buttons-activeColor': activeSize === '20 см'})}
                                onClick={(e) => {onChangeActive('20 см', 'size'); getBackgroundActiveSize(e.target.offsetLeft)}}
                                >20 см</div>
                                <div className={classNames({'popupProduct__buttons-activeColor': activeSize === '28 см'})}
                                onClick={(e) => {onChangeActive('28 см', 'size'); getBackgroundActiveSize(e.target.offsetLeft)}}
                                >28 см</div>
                                <div className={classNames({'popupProduct__buttons-activeColor': activeSize === '33 см'})}
                                onClick={(e) => {onChangeActive('33 см', 'size'); getBackgroundActiveSize(e.target.offsetLeft)}}
                                >33 см</div>
                            </div>
                        </div>
                        <div className="popupProduct__ingredients">
                            <h3 className="popupProduct__ingredients-title">Добавьте в пиццу</h3>
                            <div className="popupProduct__ingredients-wrapper">
                                {ingredients.map(({pictures, title, price}) => {
                                    return <div key={title} className="popupProduct__ingredients-item">
                                                    <div className="popupProduct__ingredients-img">
                                                        <img src={pictures} alt={title} />
                                                    </div>
                                                    <h4 className="popupProduct__ingredients-subTitle">{title}</h4>
                                                    <div className="popupProduct__ingredients-price">{price} &#8381;</div>
                                            </div>
                                })}
                            </div>
                        </div>     
                        </CustomScroll>
                        <div className="popupProduct__bottom">
                            <div className="popupProduct__bottom-price">Итого: 489 &#8381;</div>
                            <button className="button button__products">Добавить</button>
                        </div>
                </div>
            </div>
        </div>
        </CSSTransition>
    )
}

export default PopupProduct;