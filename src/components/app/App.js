import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense, lazy } from "react";

import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";
import Skeleton from "../skeleton/Skeleton";
import Stocks from "../products/stocks/Stocks";

import './app.scss';
import '../../style/style.scss';

const Pizza = lazy(() => import("../products/pizza/Pizza"));
const Drinks = lazy(() => import("../products/drinks/Drinks"));
const Snacks = lazy(() => import("../products/snacks/Snacks"));

    const App = () => {
        return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Stocks/>
                    <NavMenu/>
                    <section className="app__products">
                        <Suspense fallback={<Skeleton/>}>
                            <Routes>
                                <Route path="/" element={<Pizza/>}/>
                                <Route path="/drinks" element={<Drinks/>}/>
                                <Route path="/snacks" element={<Snacks/>}/>
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