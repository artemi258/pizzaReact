import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Stocks from "../stocks/Stocks";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";

import './app.scss';


    const App = () => {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <NavMenu/>
                    <Stocks/>
                </main>
                <Promo/>
                <Footer/>
            </div>
        
        )
    }

export default App;