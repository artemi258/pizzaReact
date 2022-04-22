import ingredients from "./ingredients";

import CustomScroll from 'react-custom-scroll';

import './popupProduct.scss'
import '../../../node_modules/react-custom-scroll/dist/customScroll.css';

const PopupProduct = () => {
    return (
        <div className="popupProduct">
            <div className="popupProduct__wrapper">
                <div className="popupProduct__img">
                    <img src={ingredients[0].pictures} alt="" />
                </div>
                    <div className="popupProduct__content">
                        <CustomScroll heightRelativeToParent="100%">
                            <h2 className="popupProduct__title">Пепперони по-деревенски</h2>
                            <div className="popupProduct__description">
                            Курица, Лук, Перец Халапеньо, Сыр Моцарелла, Томатный соу...
                            </div>
                            <div className="popupProduct__buttons">
                            <div className="popupProduct__buttons-dough">
                                <div className="popupProduct__buttons-dough-active"></div>
                                <div>Традиционное</div>
                                <div>Тонкое</div>
                            </div>
                            <div className="popupProduct__buttons-size">
                            <div className="popupProduct__buttons-size-active"></div>
                                <div>20 см</div>
                                <div>28 см</div>
                                <div>33 см</div>
                            </div>
                        </div>
                        <div className="popupProduct__ingredients">
                            <h3 className="popupProduct__ingredients-title">Добавьте в пиццу</h3>
                            <div className="popupProduct__ingredients-wrapper">
                                {ingredients.map(({pictures, title, price}) => {
                                    return <div key={title} className="popupProduct__ingredients-item">
                                                    <div className="popupProduct__ingredients-img">
                                                        <img src={pictures} alt={title} />
                                                    </div>
                                                    <h4 className="popupProduct__ingredients-subTitle">{title}</h4>
                                                    <div className="popupProduct__ingredients-price">{price} &#8381;</div>
                                            </div>
                                })}
                            </div>
                        </div>     
                        </CustomScroll>                   
                </div>
            </div>
        </div>
    )
}

export default PopupProduct;