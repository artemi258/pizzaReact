import '../stocks.scss';
import stock from '../img/stock1.png';

const StockItem = ({img, description}) => {

    return (
            <div className="stock__item" style={{background: `url(${stock}) center center no-repeat`}}>
                <div className='stock__description'>{description}</div>
            </div>
    )
}

export default StockItem;