import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchDrinks } from "./drinksSlice";
import DrinksItem from "./drinksItem/DrinksItem";

import './drinks.scss';
import '../../../style/style.scss';

const Drinks = () => {
    const {drinks} = useSelector(state => state.drinks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDrinks()).unwrap();
        scrollToRef(myRef);
    }, []);

    const scrollToRef = (ref) => {
        console.log(ref.current.getBoundingClientRect().top)

        window.scrollBy(0, ref.current.getBoundingClientRect().top - 20)
    }

    const myRef = useRef(null);


    
    const item = (arr) => {
        return arr.map(({id, img, title, liters, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <DrinksItem key={id} img={img} title={title} liters={liters} price={price}/>
                    </CSSTransition>
         });
     };

    const renderDrinks = useMemo(() => {
       return item(drinks);
    }, [drinks]);

    return (
        <div ref={myRef} className="drinks container">
            <div className="drinks__wrapper">
                    <TransitionGroup component={null}>
                        {renderDrinks}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Drinks;