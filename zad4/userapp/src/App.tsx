import React, {useEffect, useState} from 'react';
import './App.css';
import ProductsList from "./ProductsList";
import {IProduct} from "./interfaces";

function App() {
    const [shoppingCart, setShoppingCart] = useState<IProduct[]>();
    useEffect(()=>{console.log(shoppingCart)}, [shoppingCart]);
    return (
        <div className="App">
            <ProductsList cart={shoppingCart} setCart={setShoppingCart} />
        </div>
    );
}

export default App;
