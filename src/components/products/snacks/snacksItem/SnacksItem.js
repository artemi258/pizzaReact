
import '../snacks.scss';
import '../../../../style/style.scss';

const SnacksItem = ({img, title, ingredients, price}) => {

    const ingredientsFinal = ingredients.slice(0, 40)+ '...';

    const content = () => {
        
        return <div className="snacks__item">
                        <div className="snacks__img"><img src={img} alt={title} /></div>
                        <div className="snacks__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="snacks__ingredients">{ingredientsFinal}</div>
                            <div className="snacks__bottom"><button className="button button__products">Выбрать</button><span className="snacks__price">{price} &#8381;</span></div>
                        </div>
                </div>
    }
    return (
        <>
            {content()}
        </>
    )
}

export default SnacksItem;