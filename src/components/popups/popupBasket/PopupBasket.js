import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import SimpleBar from 'simplebar-react';

import { changePopupBasketActivation, addTotalPrice, addProduct, deleteProduct } from "./popupBasketSlice";

import "../../../style/style.scss";
import "./popupBasket.scss";
import 'simplebar/dist/simplebar.min.css';
import "../../../style/button.scss";

const PopupBasket = () => {
  const { popupActivation, products, totalPrice } = useSelector(
    (state) => state.popupBasket
  );
  const dispatch = useDispatch();

  const bodyOverflowHidden = () => {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();
    document.querySelector("body").style.marginRight = `${scrollWidth}px`;
    document.querySelector("body").style.overflowY = "hidden";
  };
  const bodyOverflowVisibility = () => {
    document.querySelector("body").style.overflowY = "";
    document.querySelector("body").style.marginRight = ``;
  };

  const onCloseBasket = () => {
    bodyOverflowVisibility();
    dispatch(changePopupBasketActivation(false));
  };

  const onChangeInput = (e, id, arr) => {
    const target = e.target;
    target.value = target.value.replace(/\D/ , '');
    const item = arr.filter(elem => elem.id === id);
     const resul = item.map(elem => ({...elem, quantity: +target.value}))  //
    dispatch(addProduct(resul));
  };

  const onChangeInputPlus = (e, title, arr) => {
    const item = arr.filter(elem => elem.title === title);
    const check = item.some(elem => elem.quantity >= 9);
    if (check) {
      return;
    }
     const resul = item.map(elem => ({...elem, quantity: elem.quantity + 1}))  //
    dispatch(addProduct(resul));
  };
  const onChangeInputMinus = (e, title, arr) => {
    const item = arr.filter(elem => elem.title === title);
    const check = item.some(elem => elem.quantity <= 1);
    if (check) {
      return;
    }

     const resul = item.map(elem => ({...elem, quantity: elem.quantity - 1}))  //
    dispatch(addProduct(resul));
  };

  useEffect(() => {
    totalAmount();
    popupRender();
  }, [products])

  const totalAmount = () => {
    let num = 0;
    products.forEach(elem => {
      num += elem.price * (elem.quantity === '' ? 1 : elem.quantity);
    })
    dispatch(
      addTotalPrice(num)
    );
  };

  const onDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  if (popupActivation) {
    bodyOverflowHidden();
  };

  const popupRender = () => {
    if (products.length === 0) {
      return (
        <CSSTransition
          in={popupActivation}
          timeout={300}
          classNames="visibility"
        >
          <div className="popupBasket">
            <div className="popupBasket__wrapper">
              <h2 className="title">Ваш заказ</h2>
              <div
                onClick={onCloseBasket}
                className="popupBasket__close"
              ></div>
              <div>Вы не выбрали ни одного товара</div>
              <div className="popupBasket__bottom">
                <div className="popupBasket__bottom-amount">
                  Итого: {totalPrice} &#8381;
                </div>
                <button className="button button__products">
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition in={popupActivation} timeout={300} classNames="visibility">
        <div className="popupBasket">
          <div className="popupBasket__wrapper">
            <h2 className="title">Ваш заказ</h2>
            <div onClick={onCloseBasket} className="popupBasket__close"></div>
            <div className="popupBasket__products">
            <SimpleBar style={{ maxHeight: '100%' }} autoHide={false}>
            <TransitionGroup component={null}>
              {products.map(({id, img, title, price, liters, dough, size, quantity }, i, arr) => {
                return (
                  <CSSTransition key={id} timeout={300} classNames="fadePopupProduct">
                  <div key={title} className="popupBasket__item">
                    <div onClick={() => onDeleteProduct(id)} className="popupBasket__item-delete">&#128465;</div>
                    <div className="popupBasket__img">
                      <img src={img} alt={title} />
                    </div>
                    <div className="popupBasket__info">
                      <h3 className="popupBasket__title">{title}</h3>
                      {dough ? <div className="popupBasket__dough">
                        {dough} тесто, {size}
                      </div> : liters ? <div className="popupBasket__dough">
                        {liters}
                      </div> : null}
                      <div className="popupBasket__quantity">
                        <div className="popupBasket__count">
                          <div
                            onClick={(e) => onChangeInputMinus(e, id, arr)}
                            className="popupBasket__count-minus"
                          >
                            <div>&minus;</div>
                          </div>
                          <input
                          type="text"
                          maxLength={1}
                            onChange={(e) => {
                              onChangeInput(e, id, arr);
                            }}
                            value={quantity}
                            className="popupBasket__count-input"
                          />
                          <div
                            onClick={(e) => onChangeInputPlus(e, id, arr)}
                            className="popupBasket__count-plus"
                          >
                            <div>&#43;</div>
                          </div>
                        </div>
                        <div className="popupBasket__price">
                          {quantity === '' ? price : price * quantity} &#8381;
                        </div>
                      </div>
                    </div>
                  </div>
                  </CSSTransition>
                );
              })}
                  </TransitionGroup>
                  </SimpleBar>
            </div>
            <div className="popupBasket__bottom">
              <div className="popupBasket__bottom-amount">
                Итого: {totalPrice} &#8381;
              </div>
              <NavLink onClick={onCloseBasket} to={'order'} className="button button__products">
                Оформить заказ
              </NavLink>
            </div>
          </div>
        </div>
      </CSSTransition>
    );
  };

  const renderBackground = () => {
    return (
      <CSSTransition
        in={popupActivation}
        timeout={300}
        classNames="fadeBackground"
      >
        <div onClick={onCloseBasket} className="popupBasket__background"></div>
      </CSSTransition>
    );
  };

  return (
    <>
      {renderBackground()}
      {popupRender()}
    </>
  );
};

export default PopupBasket;
