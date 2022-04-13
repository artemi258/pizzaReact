import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchSnacks } from "./snacksSlice";
import Search from "../../search/Search";
import { searchSnacks } from "../../search/searchSlice";
import SnacksItem from "./snacksItem/SnacksItem";

import './snacks.scss';
import '../../../style/style.scss';

const Snacks = () => {
    const {snacks} = useSelector(state => state.snacks);
    const {resultSnacks} = useSelector(state => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSnacks()).unwrap();
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
                        <SnacksItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
        }
     };

    const renderSnacks = useMemo(() => {
       return item(resultSnacks);
    }, [resultSnacks]);

    return (
        <div ref={myRef} className="snacks container">
            <Search data={snacks} search={searchSnacks}/>
            <div className="snacks__wrapper">
                    <TransitionGroup component={null}>
                        {renderSnacks}
                    </TransitionGroup>
            </div>
        </div>
    )
};

export default Snacks;