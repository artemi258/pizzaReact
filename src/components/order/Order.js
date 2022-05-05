import { useSelector } from 'react-redux';


import './order.scss';
import '../../style/button.scss';

const Order = () => {

    const {products} = useSelector(state => state.popupBasket);
    return (
        <div className="order">
            <div className="order__products">
                <h2 className="order__products-heading">Ваш заказ</h2>
                <div className="order__products-wrapper">
                {products.map(({id, img, title, price, liters, dough, size, quantity }, i, arr) => {
                return (
                //   <CSSTransition key={id} timeout={300} classNames="fadePopupProduct">
                  <div key={title} className="order__products-item">
                    <div className="popupBasket__item-delete">&#128465;</div>
                    <div className="order__products-img">
                      <img src={img} alt={title} />
                    </div>
                    <div className="order__products-info">
                        <div className="order__products-block">
                        <h3 className="order__products-title">{title}</h3>
                      {dough ? <div className="order__products-dough">
                        {dough} тесто, {size}
                      </div> : liters ? <div className="order__products-dough">
                        {liters}
                      </div> : null}
                        </div>
                      <div className="order__products-quantity">
                        <div className="order__products-count">
                          <div
                            // onClick={(e) => onChangeInputMinus(e, id, arr)}
                            className="order__products-count-minus"
                          >
                            <div>&minus;</div>
                          </div>
                          <input
                          type="text"
                          maxLength={1}
                            onChange={(e) => {
                            //   onChangeInput(e, id, arr);
                            }}
                            value={quantity}
                            className="order__products-count-input"
                          />
                          <div
                            // onClick={(e) => onChangeInputPlus(e, id, arr)}
                            className="order__products-count-plus"
                          >
                            <div>&#43;</div>
                          </div>
                        </div>
                        <div className="order__products-price">
                          {quantity === '' ? price : price * quantity} &#8381;
                        </div>
                      </div>
                    </div>
                  </div>
                //   </CSSTransition>
                );
              })}
                </div>
              <div className="order__products-promocode">
                  <div className="order__products-elem">
                  <input type="text" placeholder='Промокод' className="order__products-input" />
                    <button className="order__products-button"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6875 6.46641L2.60474 0.709923C2.01145 0.467386 1.34119 0.574079 0.855567 0.988227C0.369941 1.40244 0.166828 2.04066 0.325555 2.65378L1.57905 7.49621H7.7163C7.99871 7.49621 8.2277 7.72175 8.2277 7.99999C8.2277 8.27819 7.99874 8.50377 7.7163 8.50377H1.57905L0.325555 13.3462C0.166828 13.9593 0.369907 14.5975 0.855567 15.0117C1.34218 15.4267 2.01251 15.5321 2.60477 15.29L16.6875 9.53356C17.3287 9.27148 17.727 8.68384 17.727 7.99999C17.727 7.31613 17.3287 6.72846 16.6875 6.46641Z" fill="white"/>
</svg>
</button>
                  </div>
                  <div className="order__products-totalPrice">Итого: 2 379 ₽</div>
              </div>
            </div>
            <div className="order__addProducts">
                <div className="order__addProducts-item">
                    <h2 className="order__addProducts-heading">Добавить к заказу?</h2>
                    <div className="order__addProducts-elem">
                        <div className="order__addProducts-img"><img src="https://i.pinimg.com/564x/af/e5/4b/afe54bab0779ce912d3ae25a2c7fd39f.jpg" alt="" /></div>
                        <div className="order__addProducts-wrapper">
                          <h3 className="order__addProducts-title">Картофель из печи</h3>
                              <div className="order__addProducts-portion">Порция 95 г</div>
                              <button className="button button__products order__addProducts-button">179 ₽</button>
                        </div>
                            
                    </div>
                </div>
                <div className="order__addProducts-item">
                    <h2 className="order__addProducts-heading">Соусы</h2>
                    <div className="order__addProducts-elem">
                        <div className="order__addProducts-img"><img src="https://i.pinimg.com/564x/af/e5/4b/afe54bab0779ce912d3ae25a2c7fd39f.jpg" alt="" /></div>
                        <div className="order__addProducts-wrapper">
                          <h3 className="order__addProducts-title">Картофель из печи</h3>
                              <button className="button button__products order__addProducts-button">179 ₽</button>
                        </div>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order;