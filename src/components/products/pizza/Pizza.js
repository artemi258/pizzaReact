import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchPizza } from "./pizzaSlice";
import PizzaItem from "./pizzaItem/PizzaItem";
import { changeAnimation } from "./pizzaSlice";

import './pizza.scss';
import '../../../style/style.scss';

const Pizza = () => {
    const {pizza} = useSelector(state => state.pizza);
    const dispatch = useDispatch();
    const animation = useSelector(state => state.pizza.animation)

    useEffect(() => {
        dispatch(fetchPizza()).unwrap();
        if (animation) {
            scrollToRef(myRef);
        }
        dispatch(changeAnimation(true));
    }, []);
    
    console.log(animation)
    const scrollToRef = (ref) => {
        console.log(ref.current.getBoundingClientRect().top)

        window.scrollBy(0, ref.current.getBoundingClientRect().top - 20)
    }

    const myRef = useRef(null);

    const item = (arr) => {

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
        <div ref={myRef} className="pizza container">
            <div className="pizza__wrapper">
                    <TransitionGroup component={null}>
                        {renderPizza}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Pizza;