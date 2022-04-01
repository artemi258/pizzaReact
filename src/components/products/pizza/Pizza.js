import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchPizza } from "./pizzaSlice";
import Skeleton from "../../skeleton/Skeleton";
import PizzaItem from "./pizzaItem/PizzaItem";

import './pizza.scss';
import '../../../style/style.scss';

const Pizza = () => {
    const {pizza, pizzaLoadingState} = useSelector(state => state.pizza);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizza()).unwrap();
    }, []);

    const item = (arr) => {
        return arr.map(({id, img, title, ingredients, price}) => {
             return <CSSTransition key={title} timeout={1000} classNames="fade">
                        <PizzaItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
     };

    const renderPizza = useMemo(() => {
        return item(pizza);
     }, [pizza]);


    if (pizzaLoadingState === 'loading') {
        return <Skeleton/>
    } else if (pizzaLoadingState === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    return (
        <section className="pizza container">
            <div className="pizza__wrapper">
                    <TransitionGroup component={null}>
                        {renderPizza}
                    </TransitionGroup>

            </div>
        </section>
    )
};

export default Pizza;