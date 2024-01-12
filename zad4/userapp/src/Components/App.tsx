import React, {useEffect, useState} from 'react';
import '../Styles/App.css';
import ProductsList from "./ProductsList";
import {IFilters, IProduct, IProductExtended} from "../interfaces";
import Search from "./Search";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ShopNavBar from "./ShopNavBar";
import ProductsPage from "./ProductsPage";
import CheckoutPage from "./CheckoutPage";

function App() {
    const [shoppingCart, setShoppingCart] = useState<IProductExtended[]>();

    useEffect(() => {
    }, [shoppingCart]);
    return (
        <div className="App">
            <Router>
                <ShopNavBar/>
                <Routes>
                    <Route path="/" element={<ProductsPage cart={shoppingCart} setCart={setShoppingCart}/>}></Route>
                    <Route path="/checkout" element={<CheckoutPage cart={shoppingCart} setCart={setShoppingCart}/>}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
