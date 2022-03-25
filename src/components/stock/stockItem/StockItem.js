import '../stock.scss';

const StockItem = ({img, description}) => {

    return (
            <div className="stock__item" style={{background: `url(${img}) center center no-repeat`}}>
                <div className='stock__description'>{description}</div>
            </div>
    )
}

export default StockItem;