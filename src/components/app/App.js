import { Route, Routes, useLocation} from "react-router-dom";
import { Suspense, lazy } from "react";

import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";
import Skeleton from "../skeleton/Skeleton";
import SkeletonStocks from "../skeleton/skeletonStocks";
import PopupBasket from "../popups/popupBasket/PopupBasket";
import AppProducts from "./AppProducts";
import AppOrder from "./AppOrder";
// import Success from "../order/success/Success";

import './app.scss';
import '../../style/style.scss';

const Pizza = lazy(() => import("../products/pizza/Pizza"));
const Drinks = lazy(() => import("../products/drinks/Drinks"));
const Snacks = lazy(() => import("../products/snacks/Snacks"));
const Desserts = lazy(() => import("../products/desserts/Desserts"));
const Sauces = lazy(() => import("../products/sauces/Sauces"));
const Stocks = lazy(() => import("../products/stocks/Stocks"));
const Order = lazy(() => import("../order/Order"));
const Success = lazy(() => import("../order/success/Success"));

    const App = () => {

        const {pathname} = useLocation();
        return (
             <div className="app">
                <AppHeader/>
                <PopupBasket/>
                {/* <Success/> */}
                <main>
                {/\/order/gi.test(pathname) ? null : <Suspense fallback={<SkeletonStocks/>}><Stocks/></Suspense>}
                {/\/order/gi.test(pathname) ? null : <NavMenu/>}
                        <Suspense fallback={<Skeleton/>}>
                            <Routes>
                                <Route path="/" element={<AppProducts/>}>
                                    <Route index element={<Pizza/>}/>
                                    <Route path="drinks" element={<Drinks/>}/>
                                    <Route path="snacks" element={<Snacks/>}/>
                                    <Route path="desserts" element={<Desserts/>}/>
                                    <Route path="sauces" element={<Sauces/>}/>
                                </Route>
                                <Route path="/order" element={<AppOrder/>}>
                                    <Route index element={<Order/>}/>
                                    <Route path="success" element={<Success/>}/>
                                </Route>
                            </Routes>
                        </Suspense>
                </main>
                <Promo/>
                <Footer/>
            </div>
        )
    }

export default App;