import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchDrinks } from "./drinksSlice";
import DrinksItem from "./drinksItem/DrinksItem";

import './drinks.scss';
import '../../../style/style.scss';

const Drinks = () => {
    const {drinks} = useSelector(state => state.drinks);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);


    useEffect(() => {
        dispatch(fetchDrinks()).unwrap();
    }, []);

    const isActive = (e) => {
        console.log("click")
        setActive(true);
    }
    console.log(active)

    
    const item = (arr) => {
        return arr.map(({id, img, title, liters, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <DrinksItem key={id} active={active} isActive={isActive} img={img} title={title} liters={liters} price={price}/>
                    </CSSTransition>
         });
     };

    const renderDrinks = useMemo(() => {
       return item(drinks);
    }, [drinks]);

    return (
        <div className="drinks container">
            <div className="drinks__wrapper">
                    <TransitionGroup component={null}>
                        {renderDrinks}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Drinks;