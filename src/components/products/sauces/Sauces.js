import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchSauces } from "./saucesSlice";
import SaucesItem from "./saucesItem/SaucesItem";
import Search from "../../search/Search";
import { searchSauces } from "../../search/searchSlice";

import './sauces.scss';
import '../../../style/style.scss';

const Sauces = () => {
    const {sauces} = useSelector(state => state.sauces);
    const {resultSauces} = useSelector(state => state.search);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchSauces()).unwrap();
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
        return arr.map(({id, img, title, liters, price}, i , arr) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <SaucesItem key={id} img={img} title={title} liters={liters} price={price} product={arr[i]}/>
                    </CSSTransition>
         });
        }
     };

    const renderSauces = useMemo(() => {
       return item(resultSauces);
    }, [resultSauces]);

    return (
        <div ref={myRef} className="sauces container">
            <Search data={sauces} search={searchSauces} filters={false}/>
            <div className="sauces__wrapper">
                    <TransitionGroup component={null}>
                        {renderSauces}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Sauces;