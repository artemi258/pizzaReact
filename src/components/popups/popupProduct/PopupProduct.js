import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { changePopupActivation } from "./popupProductSlice";
import { addProduct } from "../popupBasket/popupBasketSlice";

import addIngredients from "./ingredients";

import SimpleBar from 'simplebar-react';
import classNames from "classnames";

import "./popupProduct.scss";
import "../../../style/button.scss";
import "../../../style/style.scss";

const PopupProduct = ({ product, triggerPizza }) => {
  const dispatch = useDispatch();
  const { popupActivation } = useSelector((state) => state.popupProduct);
  const [finalPrice, setFinalPrice] = useState({
    dough: 0,
    size: 0,
    ingredients: 0,
  });
  const [activeDough, setActiveDough] = useState("Традиционное");
  const [activeSize, setActiveSize] = useState("20 см");
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [backgroundActiveDough, getBackgroundActiveDough] = useState(0);
  const [backgroundActiveSize, getBackgroundActiveSize] = useState(0);

  const onChangeActive = (active, difference) => {
    if (difference === "dough") {
      setActiveDough(active);
    } else {
      setActiveSize(active);
    }
  };

  const closePopup = () => {
    resetPrice();
    setTimeout(() => {
      bodyOverflowVisibility();
    }, 500);
    dispatch(changePopupActivation(false));
  };

  const resetPrice = () => {
    setFinalPrice({
      dough: 0,
      size: 0,
      ingredients: 0,
    });
    setActiveIngredients([]);
    setActiveDough("Традиционное");
    setActiveSize("20 см");
    getBackgroundActiveDough(0);
    getBackgroundActiveSize(0);
  };

  const changePrice = (title, price) => {
    if (activeIngredients.includes(title)) {
      setActiveIngredients((state) => state.filter((ing) => ing !== title));
      setFinalPrice((state) => ({
        ...state,
        ingredients: state.ingredients - price,
      }));
    } else {
      setActiveIngredients((state) => state.concat(title));
      setFinalPrice((state) => ({
        ...state,
        ingredients: state.ingredients + price,
      }));
    }
  };

  const amountPrice = () => {
    return finalPrice.dough + finalPrice.size + finalPrice.ingredients;
  };

  const renderContent = () => {
    if (!product) {
      return null;
    } else if (!triggerPizza) {
      return product.map(({ img, title, ingredients, price }) => {
        return (
          <CSSTransition
            key={title}
            timeout={500}
            classNames="fadePopupProduct"
          >
            <div className="popupProduct">
              <div
                className="popupProduct__wrapper"
                style={{ height: "400px", width: "900px" }}
              >
                <div onClick={closePopup} className="popupProduct__close"></div>
                <div
                  className="popupProduct__img"
                  style={{ padding: "40px 30px" }}
                >
                  <img src={img} alt={title} />
                </div>
                <div className="popupProduct__content">
                  <h2 className="popupProduct__title">{title}</h2>
                  <div className="popupProduct__description">{ingredients}</div>
                  <div className="popupProduct__bottom">
                    <div className="popupProduct__bottom-price">
                      Итого: {price} &#8381;
                    </div>
                    <button className="button button__products"
                    onClick={() => {
                      dispatch(
                        addProduct(
                          product.map((prod) => {
                          const obj = Object.assign({}, prod);
                           return Object.assign(obj, {
                            quantity: 1
                          });
                        })
                        )
                      );
                      closePopup();
                    }}>
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        );
      });
    } else {
      return product.map(({ img, title, ingredients, price }) => {
        return (
          <CSSTransition
            key={title}
            timeout={500}
            classNames="fadePopupProduct"
          >
            <div className="popupProduct">
              <div className="popupProduct__wrapper">
                <div onClick={closePopup} className="popupProduct__close"></div>
                <div className="popupProduct__img">
                  <img src={img} alt={title} />
                </div>
                <div className="popupProduct__content">
                <SimpleBar style={{ maxHeight: '100%' }} autoHide={false}>
                    <h2 className="popupProduct__title">{title}</h2>
                    <div className="popupProduct__description">
                      {ingredients}
                    </div>
                    <div className="popupProduct__buttons">
                      <div className="popupProduct__buttons-dough">
                        <div
                          className="popupProduct__buttons-dough-active"
                          style={{ left: `${backgroundActiveDough}px` }}
                        ></div>
                        <div
                          className={classNames({
                            "popupProduct__buttons-activeColor":
                              activeDough === "Традиционное",
                          })}
                          onClick={(e) => {
                            onChangeActive("Традиционное", "dough");
                            getBackgroundActiveDough(e.target.offsetLeft);
                            setFinalPrice((state) => ({ ...state, dough: 0 }));
                          }}
                        >
                          Традиционное
                        </div>
                        <div
                          className={classNames({
                            "popupProduct__buttons-activeColor":
                              activeDough === "Тонкое",
                          })}
                          onClick={(e) => {
                            onChangeActive("Тонкое", "dough");
                            getBackgroundActiveDough(e.target.offsetLeft);
                            setFinalPrice((state) => ({ ...state, dough: 50 }));
                          }}
                        >
                          Тонкое
                        </div>
                      </div>
                      <div className="popupProduct__buttons-size">
                        <div
                          className="popupProduct__buttons-size-active"
                          style={{ left: `${backgroundActiveSize}px` }}
                        ></div>
                        <div
                          className={classNames({
                            "popupProduct__buttons-activeColor":
                              activeSize === "20 см",
                          })}
                          onClick={(e) => {
                            onChangeActive("20 см", "size");
                            getBackgroundActiveSize(e.target.offsetLeft);
                            setFinalPrice((state) => ({ ...state, size: 0 }));
                          }}
                        >
                          20 см
                        </div>
                        <div
                          className={classNames({
                            "popupProduct__buttons-activeColor":
                              activeSize === "28 см",
                          })}
                          onClick={(e) => {
                            onChangeActive("28 см", "size");
                            getBackgroundActiveSize(e.target.offsetLeft);
                            setFinalPrice((state) => ({ ...state, size: 40 }));
                          }}
                        >
                          28 см
                        </div>
                        <div
                          className={classNames({
                            "popupProduct__buttons-activeColor":
                              activeSize === "33 см",
                          })}
                          onClick={(e) => {
                            onChangeActive("33 см", "size");
                            getBackgroundActiveSize(e.target.offsetLeft);
                            setFinalPrice((state) => ({ ...state, size: 80 }));
                          }}
                        >
                          33 см
                        </div>
                      </div>
                    </div>
                    <div className="popupProduct__ingredients">
                      <h3 className="popupProduct__ingredients-title">
                        Добавьте в пиццу
                      </h3>
                      <div className="popupProduct__ingredients-wrapper">
                        {addIngredients.map(({ pictures, title, price }) => {
                          return (
                            <div
                              onClick={() => changePrice(title, price)}
                              key={title}
                              className={classNames(
                                "popupProduct__ingredients-item",
                                {
                                  "popupProduct__ingredients-active":
                                    activeIngredients.includes(title),
                                }
                              )}
                            >
                              <div className="popupProduct__ingredients-img">
                                <img src={pictures} alt={title} />
                              </div>
                              <h4 className="popupProduct__ingredients-subTitle">
                                {title}
                              </h4>
                              <div className="popupProduct__ingredients-price">
                                {price} &#8381;
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </SimpleBar>
                  <div className="popupProduct__bottom">
                    <div className="popupProduct__bottom-price">
                      Итого: {price + amountPrice()} &#8381;
                    </div>
                    <button
                      onClick={() => {
                        dispatch(
                          addProduct(
                            product.map((prod) => {
                            const obj = Object.assign({}, prod);
                             return Object.assign(obj, {
                              dough: activeDough,
                              size: activeSize,
                              price: price + amountPrice(),
                              quantity: 1
                            });
                          })
                          )
                        );
                        closePopup();
                      }}
                      className="button button__products"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        );
      });
    }
  };

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

  if (popupActivation) {
    bodyOverflowHidden();
  }

  const renderBackground = () => {
    return (
      <CSSTransition timeout={300} classNames="fadePopupProduct">
        <div onClick={closePopup} className="popupProduct__background"></div>
      </CSSTransition>
    );
  };

  return (
    <>
      <TransitionGroup component={null}>
        {popupActivation ? renderBackground() : null}
        {popupActivation ? renderContent() : null}
      </TransitionGroup>
    </>
  );
};

export default PopupProduct;
