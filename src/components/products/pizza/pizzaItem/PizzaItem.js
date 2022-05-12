import { useDispatch, useSelector } from "react-redux";
import { changePopupBasketActivation } from '../../../popups/popupBasket/popupBasketSlice';
import {
  addActiveProduct,
  changePopupActivation,
} from "../../../popups/popupProduct/popupProductSlice";

import "../pizza.scss";
import "../../../../style/style.scss";

const PizzaItem = ({ img, title, ingredients, price }) => {
  const dispatch = useDispatch();
  const {products} = useSelector(state => state.popupBasket);


  const ingredientsFinal = ingredients.slice(0, 40) + "...";
  const content = () => {
    const activationPopup = (active, trigger) => {
      dispatch(addActiveProduct(active));
      dispatch(changePopupActivation(trigger));
    };

    return (
      <div className="pizza__item">
        <div className="pizza__img">
          <img src={img} alt={title} />
        </div>
        <div className="pizza__info">
          <h5 className="title__products">{title}</h5>
          <div className="pizza__ingredients">{ingredientsFinal}</div>
          <div className="pizza__bottom">
            {products.find(item => item.id === title) ? <button onClick={() => dispatch(changePopupBasketActivation(true))} className="button button__products button__addedBasket">Добавлено</button> : <button onClick={() => activationPopup(title, true)} className="button button__products">Выбрать</button>}
            <span className="pizza__price">{price} &#8381;</span>
          </div>
        </div>
      </div>
    );
  };
  return <>{content()}</>;
};

export default PizzaItem;
