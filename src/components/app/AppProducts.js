import { Outlet } from "react-router-dom";

const AppProducts = () => {
    return (
        <section className="app__products">
            <Outlet/>
        </section>
    )
}

export default AppProducts;