import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { changePopupActivation, addTotalPrice, addProduct } from "./popupBasketSlice";

import "../../../style/style.scss";
import "./popupBasket.scss";
import "../../../style/button.scss";

const PopupBasket = () => {
  const { popupActivation, products, totalPrice } = useSelector(
    (state) => state.popupBasket
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(1);

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

  const onCloseFilters = () => {
    bodyOverflowVisibility();
    dispatch(changePopupActivation(false));
  };

  const onChangeInput = (e, title, arr) => {
    e.target.value = e.target.value.replace(/\D/g, '');
    setInputValue(e.target.value)
    const item = arr.filter(elem => elem.title === title);
     const resul = item.map(elem => ({...elem, quantity: +e.target.value}))  //
    console.log(resul)
    dispatch(addProduct(resul));
  };

  const onChangeInputPlus = (e, title, arr) => {
    e.target.value = inputValue;
    setInputValue(state => state + 1)
    const item = arr.filter(elem => elem.title === title);
     const resul = item.map(elem => ({...elem, quantity: elem.quantity + 1}))  //
    dispatch(addProduct(resul));
  };
  const onChangeInputMinus = (e, title, arr) => {
    setInputValue(state => state - 1)
    const item = arr.filter(elem => elem.title === title);
     const resul = item.map(elem => ({...elem, quantity: elem.quantity - 1}))  //
    dispatch(addProduct(resul));
  };

  useEffect(() => {
    totalAmount()
  }, [products])

  const totalAmount = () => {
    let num = 0;
    products.forEach(elem => {
      num += elem.price * elem.quantity;
    })
    console.log(num)
    dispatch(
      addTotalPrice(num)
    );
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
                onClick={onCloseFilters}
                className="popupBasket__close"
              ></div>
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
            <div onClick={onCloseFilters} className="popupBasket__close"></div>
            <div className="popupBasket__products">
              {products.map(({ img, title, price, dough, size, quantity }, i, arr) => {
                return (
                  <div key={title} className="popupBasket__item">
                    <div className="popupBasket__img">
                      <img src={img} alt={title} />
                    </div>
                    <div className="popupBasket__info">
                      <h3 className="popupBasket__title">{title}</h3>
                      <div className="popupBasket__dough">
                        {dough} тесто, {size}
                      </div>
                      <div className="popupBasket__quantity">
                        <div className="popupBasket__count">
                          <div
                            onClick={(e) => onChangeInputMinus(e, title, arr)}
                            className="popupBasket__count-minus"
                          >
                            <div>&minus;</div>
                          </div>
                          <input
                          type="text"
                            onChange={(e) => {
                              onChangeInput(e, title, arr);
                            }}
                            Value={inputValue}
                            className="popupBasket__count-input"
                          />
                          <div
                            onClick={(e) => onChangeInputPlus(e, title, arr)}
                            className="popupBasket__count-plus"
                          >
                            <div>&#43;</div>
                          </div>
                        </div>
                        <div className="popupBasket__price">
                          {price * quantity} &#8381;
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
  };

  const renderBackground = () => {
    return (
      <CSSTransition
        in={popupActivation}
        timeout={300}
        classNames="fadeBackground"
      >
        <div onClick={onCloseFilters} className="popupBasket__background"></div>
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
