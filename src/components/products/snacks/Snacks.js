import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchSnacks } from "./snacksSlice";
import SnacksItem from "./snacksItem/SnacksItem";

import './snacks.scss';
import '../../../style/style.scss';

const Snacks = () => {
    const {snacks} = useSelector(state => state.snacks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSnacks()).unwrap();
    }, []);
    

    const item = (arr) => {

        return arr.map(({id, img, title, ingredients, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <SnacksItem key={id} img={img} title={title} ingredients={ingredients} price={price}/>
                    </CSSTransition>
         });
     };

    const renderSnacks = useMemo(() => {
       return item(snacks);
    }, [snacks]);

    return (
        <div className="snacks container">
            <div className="snacks__wrapper">
                    <TransitionGroup component={null}>
                        {renderSnacks}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Snacks;