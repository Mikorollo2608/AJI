import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../Styles/App.css';
import ProductsList from "./ProductsList";
import {IFilters, IProduct, IProductExtended} from "../interfaces";
import Search from "./Search";
import CartProductsList from "./cartProductsList";
import UserDetails from "./userDetails";

type ICartProp = {
    cart: IProductExtended[];
    setCart: Dispatch<SetStateAction<IProductExtended[]>>
}

function CheckoutPage({cart,setCart}:ICartProp) {
    const [filters, setFilters] = useState<IFilters>({name: null, category:null});

    useEffect(() => {
    }, [cart]);
    return (
        <div className="CheckoutPage">
            <h1 className="mx-4 my-2" id="orderDetails">Order Details</h1>
            <CartProductsList cart={cart} setCart={setCart}/>
            <UserDetails cart={cart} setCart={setCart}/>
        </div>
    );
}

export default CheckoutPage;
