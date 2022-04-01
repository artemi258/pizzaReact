import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Stocks from "../products/stocks/Stocks";
import Pizza from "../products/pizza/Pizza";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";

import './app.scss';
import '../../style/style.scss';


    const App = () => {
        return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <NavMenu/>
                    <section className="app__products">
                        <Routes>
                            <Route path="/" element={<Stocks/>}/>
                            <Route path="/pizza" element={<Pizza/>}/>
                        </Routes>
                    </section>
                </main>
                <Promo/>
                <Footer/>
            </div>
        </Router>
        )
    }

export default App;