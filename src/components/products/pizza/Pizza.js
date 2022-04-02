import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchPizza } from "./pizzaSlice";
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
        console.log('render')

        return arr.map(({id, img, title, ingredients, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <PizzaItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
     };

    const renderPizza = useMemo(() => {
       return item(pizza);
    }, [pizza]);

    return (
        <div className="pizza container">
            <div className="pizza__wrapper">
                    <TransitionGroup component={null}>
                        {renderPizza}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Pizza;