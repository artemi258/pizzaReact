
import '../desserts.scss';
import '../../../../style/style.scss';

const DessertsItem = ({img, title, ingredients, price}) => {

    const ingredientsFinal = ingredients.slice(0, 40)+ '...';

    const content = () => {
        
        return <div className="desserts__item">
                        <div className="desserts__img"><img src={img} alt={title} /></div>
                        <div className="desserts__info">
                            <h5 className="title__products">{title}</h5>
                            <div className="desserts__ingredients">{ingredientsFinal}</div>
                            <div className="desserts__bottom"><button className="button button__products">Выбрать</button><span className="desserts__price">{price} &#8381;</span></div>
                        </div>
                </div>
    }
    return (
        <>
            {content()}
        </>
    )
}

export default DessertsItem;