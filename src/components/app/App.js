import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Suspense, lazy } from "react";

import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";
import Skeleton from "../skeleton/Skeleton";

import './app.scss';
import '../../style/style.scss';

const Stocks = lazy(() => import("../products/stocks/Stocks"));
const Pizza = lazy(() => import("../products/pizza/Pizza"));



    const App = () => {
        return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <NavMenu/>
                    <section className="app__products">
                        <Suspense fallback={<Skeleton/>}>
                            <Routes>
                                <Route path="/" element={<Stocks/>}/>
                                <Route path="/pizza" element={<Pizza/>}/>
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