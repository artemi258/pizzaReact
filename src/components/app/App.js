import AppHeader from "../appHeader/AppHeader";
import NavMenu from "../navMenu/NavMenu";
import Stock from "../stock/Stock";
import Promo from "../promo/Promo";
import Footer from "../footer/Footer";

import './app.scss';


    const App = () => {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <NavMenu/>
                    <Stock/>
                </main>
                <Promo/>
                <Footer/>
            </div>
        
        )
    }

export default App;