import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchDesserts } from "./dessertsSlice";
import DessertsItem from "./dessertsItem/DessertsItem";
import Search from "../../search/Search";
import { searchDesserts } from "../../search/searchSlice";

import './desserts.scss';
import '../../../style/style.scss';

const Desserts = () => {
    const {desserts} = useSelector(state => state.desserts);
    const {resultDesserts} = useSelector(state => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDesserts()).unwrap();
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
        return arr.map(({id, img, title, ingredients, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <DessertsItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
        }
     };

    const renderDesserts = useMemo(() => {
       return item(resultDesserts);
    }, [resultDesserts]);

    return (
        <div ref={myRef} className="desserts container">
            <Search data={desserts} search={searchDesserts} filters={false}/>
            <div className="desserts__wrapper">
                    <TransitionGroup component={null}>
                        {renderDesserts}
                    </TransitionGroup>
            </div>
        </div>
    )
};

export default Desserts;