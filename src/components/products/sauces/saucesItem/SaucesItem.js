
import '../sauces.scss';
import '../../../../style/style.scss';

const SaucesItem = ({ img, title, liters, price }) => {
    const content = () => {
         return <div className="sauces__item">
                        <div className="sauces__img"><img src={img} alt={title} /></div>
                        <div className="sauces__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="sauces__liters drinks__liters-noChange">{liters}</div>
                            <div className="sauces__bottom"><button className="button button__products">Выбрать</button><span className="sauces__price">{price} &#8381;</span></div>
                        </div>
                </div>
    }
    return (
        <>
            {content()}
        </>
    )
}

export default SaucesItem;