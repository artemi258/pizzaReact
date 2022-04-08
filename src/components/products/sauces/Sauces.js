import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { CSSTransition, TransitionGroup} from "react-transition-group";

import { fetchSauces } from "./saucesSlice";
import SaucesItem from "./saucesItem/SaucesItem";

import './sauces.scss';
import '../../../style/style.scss';

const Sauces = () => {
    const {sauces} = useSelector(state => state.sauces);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchSauces()).unwrap();
    }, []);
    
    const item = (arr) => {
        return arr.map(({id, img, title, liters, price}) => {
             return <CSSTransition key={id} timeout={300} classNames="fade">
                        <SaucesItem key={id} img={img} title={title} liters={liters} price={price}/>
                    </CSSTransition>
         });
     };

    const renderSauces = useMemo(() => {
       return item(sauces);
    }, [sauces]);

    return (
        <div className="sauces container">
            <div className="sauces__wrapper">
                    <TransitionGroup component={null}>
                        {renderSauces}
                    </TransitionGroup>

            </div>
        </div>
    )
};

export default Sauces;