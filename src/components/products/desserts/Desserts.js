import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchDesserts } from "./dessertsSlice";
import DessertsItem from "./dessertsItem/DessertsItem";

import './desserts.scss';
import '../../../style/style.scss';

const Desserts = () => {
    const {desserts} = useSelector(state => state.desserts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDesserts()).unwrap();
        scrollToRef(myRef);
    }, []);
    
    const scrollToRef = (ref) => {
        console.log(ref.current.getBoundingClientRect().top)

        window.scrollBy(0, ref.current.getBoundingClientRect().top - 20)
    }

    const myRef = useRef(null);

    const item = (arr) => {

        return arr.map(({id, img, title, ingredients, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <DessertsItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
     };

    const renderDesserts = useMemo(() => {
       return item(desserts);
    }, [desserts]);

    return (
        <div ref={myRef} className="desserts container">
            <div className="desserts__wrapper">
                    <TransitionGroup component={null}>
                        {renderDesserts}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Desserts;