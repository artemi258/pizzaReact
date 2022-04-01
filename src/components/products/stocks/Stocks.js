import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks } from "./stocksSlice";

import StocksItem from './stocksItem/StocksItem';
import Skeleton from "../../skeleton/Skeleton";

import './stocks.scss';

const Stocks = () => {

    const dispatch = useDispatch();
    const {stocks, stockLoadingState} = useSelector(state => state.stocks);

    useEffect(() => {
        dispatch(fetchStocks()).unwrap();
    }, []);

    if (stockLoadingState === 'loading') {
        return <Skeleton/>
    } else if (stockLoadingState === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const stock = (arr) => {
            
               return arr.map(item => {
                    return <StocksItem key={item.id} img={item.img} description={item.description}/>
                })
    }
    
    const renderStock = stock(stocks);

    return (
        <section className="stock container">
            <div className="stock__wrapper">
                {renderStock}
            </div>
        </section>
    )
}

export default Stocks;