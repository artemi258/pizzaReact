import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense, lazy } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";
import Skeleton from "../skeleton/Skeleton";

import './app.scss';
import '../../style/style.scss';

const Pizza = lazy(() => import("../products/pizza/Pizza"));
const Drinks = lazy(() => import("../products/drinks/Drinks"));
const Snacks = lazy(() => import("../products/snacks/Snacks"));
const Desserts = lazy(() => import("../products/desserts/Desserts"));
const Sauces = lazy(() => import("../products/sauces/Sauces"));
const Stocks = lazy(() => import("../products/stocks/Stocks"));



    const App = () => {
        return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                <Suspense fallback={<Skeleton/>}>
                    <Stocks/>
                </Suspense>
                    <NavMenu/>
                    <section className="app__products">
                        <Suspense fallback={<Skeleton/>}>
                            <Routes>
                                <Route path="/" element={<Pizza/>}/>
                                <Route path="/drinks" element={<Drinks/>}/>
                                <Route path="/snacks" element={<Snacks/>}/>
                                <Route path="/desserts" element={<Desserts/>}/>
                                <Route path="/sauces" element={<Sauces/>}/>
                            </Routes>
                        </Suspense>
                    </section>
                </main>
                <Promo/>
                <Footer/>
            </div>
        </Router>
        )
    }

export default App;