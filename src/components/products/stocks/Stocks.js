import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from "react-transition-group";
import { fetchStocks } from "./stocksSlice";

import StocksItem from './stocksItem/StocksItem';
import Skeleton from "../../skeleton/Skeleton";

import './stocks.scss';
import '../../../style/style.scss';

const Stocks = () => {

    const dispatch = useDispatch();
    const {stocks} = useSelector(state => state.stocks);

    useEffect(() => {
        dispatch(fetchStocks()).unwrap();
    }, []);

    const stock = (arr) => {
               return arr.map(({id, img, description}) => {
                    return  <CSSTransition  key={id} timeout={300} classNames="fade">
                                <StocksItem key={id} img={img} description={description}/>
                            </CSSTransition>
                })
    }
    
    const renderStock = stock(stocks);

    return (
        <section className="stock container">
            <div className="stock__wrapper">
                    <TransitionGroup component={null}>
                        {renderStock}
                    </TransitionGroup>
            </div>
        </section>
    )
}

export default Stocks;