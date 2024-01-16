import React from 'react';
import '../Styles/App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import ShopNavBar from "./ShopNavBar";
import ProductsPage from "./ProductsPage";
import OrdersPage from "./OrdersPage";

function App() {

  return (
      <div className="App">
        <Router>
          <ShopNavBar/>
          <Routes>
            <Route path="/" element={<ProductsPage />}></Route>
            {<Route path="/orders" element={<OrdersPage />}></Route>}
          </Routes>
        </Router>
      </div>
  );
}

export default App;
