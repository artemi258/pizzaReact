import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay} from "swiper";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { addProduct, deleteProduct, changePopupBasketActivation } from "../popups/popupBasket/popupBasketSlice";
// import { fetchDesserts } from "../products/desserts/dessertsSlice";
// import { fetchSnacks } from "../products/snacks/snacksSlice";
// import { fetchSauces } from "../products/sauces/saucesSlice";
import { addDesserts } from "../products/desserts/dessertsSlice";
import { addSauces } from "../products/sauces/saucesSlice";
import { addSnacks } from "../products/snacks/snacksSlice";
import { useHttp } from "../../hooks/http.hook";
import product from '../../JSON/product.json';

import './order.scss';
import "swiper/css";
import "swiper/css/pagination";
import '../../style/button.scss';

const Order = () => {

    const {products, totalPrice} = useSelector(state => state.popupBasket);
    const {desserts} = useSelector(state => state.desserts);
    const {sauces} = useSelector(state => state.sauces);
    const {snacks} = useSelector(state => state.snacks);
    const [backgroundActive, getBackgroundActive] = useState(0);
    const [checkedChange, setCheckedChange] = useState(true);
    const [activeDelivery, setActiveDelivery] = useState('Доставка');
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    const {request} = useHttp();
    let supplement = useMemo(() => {
      if (snacks === [] || desserts === []) {
        return [];
      }
     return [].concat(desserts, snacks);
    }, [desserts, snacks]);

    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
    } = useForm({mode: 'onChange'});

    const onSubmit = async (data) => {
      let newData;
      if (!checkedChange) {
        newData = await {id: nanoid(), ...data, change: `${data.change} ${data.changeInput}р`, products, totalPrice};
        delete newData.changeInput;
      } else {
        newData = await {id: nanoid(), ...data, products, totalPrice};
      }
      setPhone('');
      setCheckedChange(true);
      // reset();
      const postData = await JSON.stringify(newData);
     
      request(`${product}/Orders`, 'POST', postData)
      .then(data => navigate('../success'))
    };

    useEffect(() => {
      // dispatch(fetchDesserts()).unwrap();
      // dispatch(fetchSnacks()).unwrap();
      // dispatch(fetchSauces()).unwrap();
      dispatch(addDesserts(product.desserts));
      dispatch(addSnacks(product.snacks));
      dispatch(addSauces(product.sauces));
      window.scrollTo(0, 101)
    }, []);
console.log('render')
    const onChange = (e) => {
      let i = 0;

      if (e.target.value[0] !== '+') {
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        e.target.value = e.target.value.slice(1) + e.target.value[0];
      }if (e.target.value[1] !== '7') {
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);
        e.target.value = e.target.value.slice(0, 0) + e.target.value.slice(2) + e.target.value[1];
      }
      const val = e.target.value.length <= 1 ? e.target.value.replace(/\D/g, '') : e.target.value.replace(/\D/g, '').slice(1);
      const matrix = '+7 (___) __-__-___';
      if (val.length === 0) {
        e.target.value = '+7';
        setPhone(e.target.value);
        return;
      };

      e.target.value = matrix.replace(/./g, function(a) {
        return /[_]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      })

      setPhone(e.target.value);
    }

    const onChangeInput = (e, id, arr) => {
      const target = e.target;
      target.value = target.value.replace(/\D/ , '');
      const item = arr.filter(elem => elem.id === id);
       const resul = item.map(elem => ({...elem, quantity: +target.value}))  //
      dispatch(addProduct(resul));
    };
  
    const onChangeInputPlus = (e, title, arr) => {
      const item = arr.filter(elem => elem.title === title);
      const check = item.some(elem => elem.quantity >= 9);
      if (check) {
        return;
      }
       const resul = item.map(elem => ({...elem, quantity: elem.quantity + 1}))  //
      dispatch(addProduct(resul));
    };
    const onChangeInputMinus = (e, title, arr) => {
      const item = arr.filter(elem => elem.title === title);
      const check = item.some(elem => elem.quantity <= 1);
      if (check) {
        return;
      }
  
       const resul = item.map(elem => ({...elem, quantity: elem.quantity - 1}))  //
      dispatch(addProduct(resul));
    };

    const onDeleteProduct = (id) => {
      dispatch(deleteProduct(id));
    };
    return (
        <div className="order">
            <div className="order__products">
                <h2 className="order__products-heading">Ваш заказ</h2>
                <div className="order__products-wrapper">
                <TransitionGroup component={null}>
                {products.map(({id, img, title, price, liters, dough, size, quantity }, i, arr) => {
                return (
                  <CSSTransition key={id} timeout={300} classNames="fade">
                  <div key={title} className="order__products-item">
                    <div onClick={() => onDeleteProduct(id)} className="popupBasket__item-delete">&#128465;</div>
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
                            onClick={(e) => onChangeInputMinus(e, id, arr)}
                            className="order__products-count-minus"
                          >
                            <div>&minus;</div>
                          </div>
                          <input
                          type="text"
                          maxLength={1}
                            onChange={(e) => {
                              onChangeInput(e, id, arr);
                            }}
                            value={quantity}
                            className="order__products-count-input"
                          />
                          <div
                            onClick={(e) => onChangeInputPlus(e, id, arr)}
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
                   </CSSTransition>
                );
              })}
              </TransitionGroup>
                </div>
              <div className="order__products-promocode">
                  <div className="order__products-elem">
                  <input type="text" placeholder='Промокод' className="order__products-input" />
                    <button className="order__products-button"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6875 6.46641L2.60474 0.709923C2.01145 0.467386 1.34119 0.574079 0.855567 0.988227C0.369941 1.40244 0.166828 2.04066 0.325555 2.65378L1.57905 7.49621H7.7163C7.99871 7.49621 8.2277 7.72175 8.2277 7.99999C8.2277 8.27819 7.99874 8.50377 7.7163 8.50377H1.57905L0.325555 13.3462C0.166828 13.9593 0.369907 14.5975 0.855567 15.0117C1.34218 15.4267 2.01251 15.5321 2.60477 15.29L16.6875 9.53356C17.3287 9.27148 17.727 8.68384 17.727 7.99999C17.727 7.31613 17.3287 6.72846 16.6875 6.46641Z" fill="white"/>
</svg>
</button>
                  </div>
                  <div className="order__products-totalPrice">Итого: {totalPrice} ₽</div>
              </div>
            </div>
            <div className="order__addProducts">
                <div className="order__addProducts-item">
                    <h2 className="order__addProducts-heading">Добавить к заказу?</h2>
                    <Swiper
                            speed={1000}
                            initialSlide={1}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                              }}
                            slidesPerView={4}
                            spaceBetween={30}
                            slidesPerGroup={4}
                            loop={true}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation, Autoplay]}
                        >
                    {supplement.map(({id, img, title, price}, i , arr) => {
                     return <SwiperSlide key={id}>
                      <div className="order__addProducts-elem">
                        <div className="order__addProducts-img"><img src={img} alt={title} /></div>
                        <div className="order__addProducts-wrapper">
                          <h3 className="order__addProducts-title">{title}</h3>
                                {products.find(item => item.id === title) ? <button disabled onClick={() => dispatch(changePopupBasketActivation(true))} className="button button__products  order__addProducts-button">Добавлено</button> : <button onClick={() => dispatch(addProduct(
                                [{...arr[i], quantity: 1}]))} className="button button__products order__addProducts-button">{price} ₽</button>}
                        </div>    
                    </div>
                    </SwiperSlide>
                    })}
                    </Swiper>
                </div>
                <div className="order__addProducts-item">
                    <h2 className="order__addProducts-heading">Соусы</h2>
                <Swiper
                            speed={1000}
                            initialSlide={1}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                              }}
                            slidesPerView={4}
                            spaceBetween={30}
                            slidesPerGroup={4}
                            loop={true}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation, Autoplay]}
                        >
                    {sauces.map(({id, img, title, price}, i , arr) => {
                     return <SwiperSlide key={id}>
                    <div className="order__addProducts-elem">
                        <div className="order__addProducts-img"><img src={img} alt={title} /></div>
                        <div className="order__addProducts-wrapper">
                          <h3 className="order__addProducts-title">{title}</h3>
                          {products.find(item => item.id === title) ? <button disabled onClick={() => dispatch(changePopupBasketActivation(true))} className="button button__products  order__addProducts-button">Добавлено</button> : <button onClick={() => dispatch(addProduct(
                                [{...arr[i], quantity: 1}]))} className="button button__products order__addProducts-button">{price} ₽</button>}
                        </div>
                    </div>
                    </SwiperSlide>
                    })}
                    </Swiper>
                    </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} action="" className="order__form">
              <div className="order__form-item">
              <h2 className="order__form-title">О вас</h2>
              <div className="order__form-wrapper">
              <div className="order__form-input">
                  <label htmlFor="userName">Имя</label>
                  <input style={{borderColor: errors.userName ? 'red' : ''}} {...register("userName", {required: true, pattern: /^[\W]+$/i})} type="text" id="userName" placeholder='Алексей'/>
                  {errors.userName && errors.userName.type === 'pattern' && (
        <p className="order__form-error">Только русские буквы</p>
      )}
      {errors.userName && errors.userName.type === 'required' && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
                <div className="order__form-input">
                  <label htmlFor="userName">Номер телефона</label>
                  <input style={{borderColor: errors.userPhone && !phone ? 'red' : ''}} {...register("userPhone", {required: true, minLength: 18})} onFocus={(e) => !phone ? setPhone('+7 ') : e.target.value = phone} onChange={onChange} value={phone} type="text" id="userPhone" placeholder='+7 000 00 00 000'/>
                  {errors.userPhone && errors.userPhone.type === 'required' && !phone && (
        <p className="order__form-error">Обязательное поле</p>
      )}
        { errors.userPhone && errors.userPhone.type === 'minLength' && phone.length < 18 && (
                <p className="order__form-error">Недостаточное количество цифр</p>
              )}
                </div>
                <div className="order__form-input">
                  <label htmlFor="userEmail">Почта</label>
                  <input style={{borderColor: errors.userEmail ? 'red' : ''}} {...register("userEmail", {required: true, pattern: /^.+@(.+\.)?(.+)\..{2,}$/ig})} type="text" id="userEmail" placeholder='mail@gmail.com'/>
                  {errors.userEmail && errors.userEmail.type === 'pattern' && (
        <p className="order__form-error">Не правильный адрес емайл</p>)}
        {errors.userEmail && errors.userEmail.type === 'required' && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
              </div>
              </div>
              <div className="order__form-item">
              <h2 className="order__form-title">Доставка</h2>
              <div className="order__form-delivery">
                  <div className="order__form-delivery-active" style={{left: `${backgroundActive}px`}}></div>
                  <input checked={true}  value="Доставка" {...register("delivery")} type="radio" id="delivery" name='delivery'/>
                  <label htmlFor="delivery" onClick={e => {setActiveDelivery(e.target.textContent); getBackgroundActive(e.target.offsetLeft)}} className={classNames("order__form-delivery-button", {'order__form-delivery-color': activeDelivery === 'Доставка'})}>Доставка</label>
                  <input value="Самовывоз" {...register("delivery")} type="radio" id="pickup" name='delivery'/>
                  <label htmlFor="pickup" onClick={e => {setActiveDelivery(e.target.textContent);  getBackgroundActive(e.target.offsetLeft)}}className={classNames("order__form-delivery-button", {'order__form-delivery-color': activeDelivery === 'Самовывоз'})}>Самовывоз</label>
              </div>
                <div className="order__form-input">
                  <label htmlFor="userStreet">Улица</label>
                  <input style={{borderColor: errors.userStreet ? 'red' : ''}} {...register("userStreet", {required: true, pattern: /\W+/i})} 
           type="text" id="userStreet" placeholder='Пушкина'/>
                  {errors.userStreet && errors.userStreet.type === 'pattern' && (
        <p className="order__form-error">Только русские буквы</p>)}
        {errors.userStreet && errors.userStreet.type === 'required' && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
                <div className="order__form-home">
                  <div className="order__form-input">
                    <label htmlFor="userHome">Дом</label>
                    <input style={{borderColor: errors.userHome ? 'red' : ''}} {...register("userHome", {required: true})} type="text" id="userHome" placeholder='1а'/>
                    {errors.userHome && (
        <p className="order__form-error">Обязательное поле</p>)}
                  </div>
                  <div className="order__form-input">
                  <label htmlFor="userEntrance">Подъезд</label>
                  <input style={{borderColor: errors.userEntrance ? 'red' : ''}} {...register("userEntrance", {required: true})} type="text" id="userEntrance" placeholder='1'/>
                  {errors.userEntrance && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
                <div className="order__form-input">
                  <label htmlFor="userFloor">Этаж</label>
                  <input style={{borderColor: errors.userFloor ? 'red' : ''}} {...register("userFloor", {required: true})} type="text" id="userFloor" placeholder='2'/>
                  {errors.userFloor && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
                <div className="order__form-input">
                  <label htmlFor="userFlat">Квартира</label>
                  <input style={{borderColor: errors.userFlat ? 'red' : ''}} {...register("userFlat", {required: true})} type="text" id="userFlat" placeholder='3'/>
                  {errors.userFlat && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
                <div className="order__form-input">
                  <label htmlFor="userIntercom">Домофон</label>
                  <input style={{borderColor: errors.userIntercom ? 'red' : ''}} {...register("userIntercom", {required: true, pattern: /\d+/})} type="text" id="userIntercom" placeholder='0000'/>
                  {errors.userIntercom && errors.userIntercom.type === 'required' && (
        <p className="order__form-error">Обязательное поле</p>)}
        {errors.userIntercom && errors.userIntercom.type === 'pattern' && (
        <p className="order__form-error">Только цифры</p>)}
                </div>
                </div>
                <div className="order__form-orderSpeed">
                  <h6>Когда выполнить заказ?</h6>
                  <div className="order__form-wrapper radio">
                <div className="order__form-radio">
                  <input {...register("order", {required: true})} value="Как можно скорее" type="radio" id="quickly" name='order'/>
                  <label htmlFor="quickly">Как можно скорее</label>
                </div>
                <div className="order__form-radio">
                  <input {...register("order", {required: true})} value="По времени" type="radio" id="noQuickly" name='order'/>
                  <label htmlFor="noQuickly">По времени</label>
                </div>
                </div>
                {errors.order && (
        <p className="order__form-error">Обязательное поле</p>)}
                </div>
              </div>
              <div className="order__form-item">
              <h2 className="order__form-title">Оплата</h2>
              <div className="order__form-wrapper radio">
              <div className="order__form-radio">
                  <input {...register("payment", {required: true})} value="Наличными" type="radio" id="cash" name='payment'/>
                  <label htmlFor="cash">Наличными</label>
                </div>
                <div className="order__form-radio">
                  <input {...register("payment", {required: true})} value="Картой" type="radio" id="card" name='payment'/>
                  <label htmlFor="card">Картой</label>
                </div>
                <div className="order__form-radio">
                  <input {...register("payment", {required: true})} value="Apple Pay" type="radio" id="pay" name='payment'/>
                  <label htmlFor="pay">Apple Pay</label>
                </div>
                </div>
                {errors.payment && (
        <p className="order__form-error">Обязательное поле</p>)}
              </div>
              <div className="order__form-item">
              <h2 className="order__form-title">Сдача</h2>
              <div className="order__form-wrapper radio">
              <div className="order__form-radio">
                  <input {...register("change", {required: true})} value="Без сдачи" onClick={() => setCheckedChange(true)} type="radio" id="withoutChange"/>
                  <label htmlFor="withoutChange">Без сдачи</label>
                </div>
                <div className="order__form-radio">
                  <input checked={!checkedChange} {...register("change", {required: true})} onClick={() => setCheckedChange(false)} type="radio" id="change" value={'Сдача с'}/>
                  <label htmlFor="change">Сдача с</label>
                  {checkedChange ? <div className="order__form-fakeInput">0</div> : <input {...register("changeInput")} type="text" placeholder='0'/>}
                  <span></span>
                </div>
             </div>
             {errors.change && (
        <p className="order__form-error">Обязательное поле</p>)}
              </div>
              <div className="order__form-item">
              <h2 className="order__form-title">Комментарий</h2>
              <textarea {...register("comment")} name="comment" placeholder='Есть уточнения?' id="" cols="30" rows="10"></textarea>
              </div>
              <div className="order__form-bottom">
                <div className="order__form-totalPrice">Итого: {totalPrice} ₽</div>
                <button type="submit" className="button button__products order__form-button">Оформить заказ</button>
              </div>
            </form>
        </div>
    )
}

export default Order;