import React from 'react';
import '../Styles/App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ShopNavBar from "./ShopNavBar";
import ProductsPage from "./ProductsPage";

function App() {

  return (
      <div className="App">
        <Router>
          <ShopNavBar/>
          <Routes>
            <Route path="/" element={<ProductsPage />}></Route>
            {/*<Route path="/checkout" element={<CheckoutPage cart={shoppingCart} setCart={setShoppingCart}/>}></Route>*/}
          </Routes>
        </Router>
      </div>
  );
}

export default App;
