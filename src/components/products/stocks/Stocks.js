import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay} from "swiper";
import { fetchStocks } from "./stocksSlice";

import StocksItem from './stocksItem/StocksItem';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/scss/autoplay";
import './stocks.scss';
import '../../../style/style.scss';

const Stocks = () => {

    const dispatch = useDispatch();
    const {stocks} = useSelector(state => state.stocks);

    useEffect(() => {
        dispatch(fetchStocks()).unwrap();
        // eslint-disable-next-line
    }, []);

    const stock = (arr) => {
               return arr.map(({id, img, description}) => {
                    return  <SwiperSlide key={id}>
                                <StocksItem key={id} img={img} description={description}/>
                            </SwiperSlide>
                })
    }
    
    const renderStock = useMemo(() => {
        return stock(stocks);
    }, [stocks]);

    return (
        <section className="stock container">
            <div className="stock__wrapper">
                        <Swiper
                            speed={1000}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true
                              }}
                            slidesPerView={4}
                            spaceBetween={20}
                            slidesPerGroup={4}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                            clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation, Autoplay]}
                        >
                            {renderStock}
                        </Swiper>
            </div>
        </section>
        // <section className="stock container">
        //     <div className="stock__wrapper">
        //             <TransitionGroup component={null}>
        //                 {renderStock}
        //             </TransitionGroup>
        //     </div>
        // </section>
    )
}

export default Stocks;