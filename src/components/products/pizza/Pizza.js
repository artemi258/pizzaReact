import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, memo, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PizzaItem from "./pizzaItem/PizzaItem";
import Search from "../../search/Search";
import Filters from "../../popups/popupFilters/PopupFilters";
import PopupProduct from "../../popups/popupProduct/PopupProduct";
import { changeAnimation } from "./pizzaSlice";
import { searchPizza } from "../../search/searchSlice";
import { filteringPizza } from "../../popups/popupFilters/popupFiltersSlice";
import { addPizza } from "./pizzaSlice";
import products from '../../../JSON/product.json';

import "./pizza.scss";
import "../../../style/style.scss";

const Pizza = memo(() => {
  const [checkingFirstRender, setCheckingFirstRender] = useState(true)
  const { pizza } = useSelector((state) => state.pizza);
  const { resultPizza } = useSelector((state) => state.search);
  const { activeProduct } = useSelector((state) => state.popupProduct);
  const { filters, resultFilteringPizza } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  const animation = useSelector((state) => state.pizza.animation);
  useEffect(() => {
    dispatch(addPizza(products.pizza));
    if (animation) {
      scrollToRef(myRef);
    }
    dispatch(changeAnimation(true));

    // eslint-disable-next-line
  }, []);

  const scrollToRef = (ref) => {
    window.scrollBy(0, ref.current.getBoundingClientRect().top - 20);
  };

  const myRef = useRef();

  const item = (arr) => {
    if (arr.length === 0) {
        return (
          <CSSTransition key={"notFound"} timeout={300} classNames="fade">
            <h5 className="notFound">К сожалению, товар не найден</h5>
          </CSSTransition>
        );
    } else {
      return arr.map(({ id, img, title, ingredients, price }) => {
        return (
          <CSSTransition key={id} timeout={300} classNames="fade">
            <PizzaItem
              key={id}
              img={img}
              title={title}
              ingredients={ingredients}
              price={price}
            />
          </CSSTransition>
        );
      });
    }
  };

  const renderPizza = useMemo(() => {
    return item(resultFilteringPizza);
  }, [resultFilteringPizza]);

  const pizzaFilters = () => {
    const item = filters.filter((product) =>
      Object.keys(product).includes("pizza")
    );
    const res = item.map((item) => {
      return item.pizza;
    });
    return res[0];
  };

  const popupProductInfo = useMemo(() => {
    const item = resultFilteringPizza.filter(
      (item) => item.id === activeProduct
    );
    return item;
  }, [activeProduct]);

  return (
    <div ref={myRef} className="pizza container">
      <PopupProduct product={popupProductInfo} triggerPizza={true} />
      <Filters
        filters={pizzaFilters()}
        data={resultPizza}
        action={filteringPizza}
      />
      <Search data={pizza} search={searchPizza} filters={true} />
      <div className="pizza__wrapper">
        <TransitionGroup component={null}>{renderPizza}</TransitionGroup>
      </div>
    </div>
  );
});

export default Pizza;