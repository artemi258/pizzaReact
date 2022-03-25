import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";
import StockItem from './stockItem/StockItem';

import './stock.scss';

const Stock = () => {
    const [data, setData] = useState();

    const {request} = useHttp();

    useEffect(() => {
        onRequest();
    }, []);

    const onData = (data) => {
        setData(data);
    }

    const onRequest = () => {
        request('http://localhost:3001/stock')
        .then(res => onData(res))
        .then(console.log('акции получены!'))
        .catch(error => console.log(error));
    }

    const stock = (arr) => {

        if (arr === undefined) {
                return <h5>акций еще нет</h5>
            }
            
               return arr.map(item => {
                    return <StockItem key={item.id} img={item.img} description={item.description}/>
                })
    }
    
    const renderStock = stock(data);

    return (
        <section className="stock container">
            <div className="stock__wrapper">
                {renderStock}
            </div>
        </section>
    )
}

export default Stock;