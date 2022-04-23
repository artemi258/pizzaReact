import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CSSTransition,TransitionGroup } from "react-transition-group";
import { changePopupActivation } from "./popupProductSlice";

import addIngredients from "./ingredients";

import CustomScroll from 'react-custom-scroll';
import classNames from "classnames";

import './popupProduct.scss'
import '../../style/button.scss';
import '../../style/style.scss';
import '../../../node_modules/react-custom-scroll/dist/customScroll.css';

const PopupProduct = ({product}) => {

    const dispatch = useDispatch();
    const {popupActivation} = useSelector(state => state.popupProduct)
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
        setTimeout(() => {
            bodyOverflowVisibility();
        }, 300);
        dispatch(changePopupActivation(false));
    }


    const renderContent = () => {
        if (!product) {
            return null;
        }   else {
           return product.map(({img, title, ingredients, price}) => {
            return <CSSTransition key={title} timeout={500} classNames="fadePopupProduct">
            <div className="popupProduct">
                <div className="popupProduct__wrapper">
                <div onClick={closePopup} className="popupProduct__close"></div>
                    <div className="popupProduct__img">
                        <img src={img} alt={title} />
                    </div>
                        <div className="popupProduct__content">
                            <CustomScroll heightRelativeToParent="100%">
                                <h2 className="popupProduct__title">{title}</h2>
                                <div className="popupProduct__description">
                                {ingredients}
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
                                    {addIngredients.map(({pictures, title, price}) => {
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
                                <div className="popupProduct__bottom-price">Итого: {price} &#8381;</div>
                                <button className="button button__products">Добавить</button>
                            </div>
                    </div>
                </div>
            </div>
            </CSSTransition>
           })
        }
    }

    const bodyOverflowHidden = () => {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;

        div.remove();
        document.querySelector('body').style.marginRight = `${scrollWidth}px`;
        document.querySelector('body').style.overflowY = 'hidden';
    }
    const bodyOverflowVisibility = () => {
        document.querySelector('body').style.overflowY = '';
        document.querySelector('body').style.marginRight = ``;
    }

    if (popupActivation) {
        bodyOverflowHidden();
    };

    const renderBackground = () => {
        return <CSSTransition timeout={300} classNames="fadePopupProduct">
                <div onClick={closePopup} className="popupProduct__background"></div>
                </CSSTransition>
}

    return (
        <>
        <TransitionGroup component={null}>
        {popupActivation ? renderBackground() : null}
       {popupActivation ? renderContent() : null}
       </TransitionGroup>
       </>
    )
}

export default PopupProduct;