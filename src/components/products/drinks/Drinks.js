import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchDrinks } from "./drinksSlice";
import DrinksItem from "./drinksItem/DrinksItem";
import Search from "../../search/Search";
import { searchDrinks } from "../../search/searchSlice";

import './drinks.scss';
import '../../../style/style.scss';

const Drinks = () => {
    const {drinks} = useSelector(state => state.drinks);
    const {resultDrinks} = useSelector(state => state.search)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDrinks()).unwrap();
        scrollToRef(myRef);
        // eslint-disable-next-line
    }, []);

    const scrollToRef = (ref) => {

        window.scrollBy(0, ref.current.getBoundingClientRect().top - 20)
    }

    const myRef = useRef();


    
    const item = (arr) => {
        if (arr.length === 0) {
            return <CSSTransition key={'notFound'} timeout={300} classNames="fade">
                        <h5 className="notFound">К сожалению, товар не найден</h5>
                    </CSSTransition>
        } else {
            return arr.map(({id, img, title, liters, price}) => {
                return <CSSTransition key={id} timeout={300} classNames="fade">
                           <DrinksItem key={id} img={img} title={title} liters={liters} price={price}/>
                       </CSSTransition>
            });
        }
     };

    const renderDrinks = useMemo(() => {
       return item(resultDrinks);
    }, [resultDrinks]);

    return (
        <div ref={myRef} className="drinks container">
            <Search data={drinks} search={searchDrinks}/>
            <div className="drinks__wrapper">
                    <TransitionGroup component={null}>
                        {renderDrinks}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Drinks;