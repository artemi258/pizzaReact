
import '../pizza.scss';
import '../../../../style/style.scss';

const PizzaItem = ({img, title, ingredients, price}) => {

    const ingredientsFinal = ingredients.slice(0, 40)+ '...';
    const content = () => {
        
        return <div className="pizza__item">
                        <div className="pizza__img"><img src={img} alt={title} /></div>
                        <div className="pizza__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="pizza__ingredients">{ingredientsFinal}</div>
                            <div className="pizza__bottom"><button className="button button__products">Выбрать</button><span className="pizza__price">{price} &#8381;</span></div>
                        </div>
                </div>
    }
    return (
        <>
            {content()}
        </>
    )
}

export default PizzaItem;