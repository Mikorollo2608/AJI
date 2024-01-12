import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../Styles/App.css';
import ProductsList from "./ProductsList";
import {IFilters, IProduct, IProductExtended} from "../interfaces";
import Search from "./Search";
import CartProductsList from "./cartProductsList";

type ICartProp = {
    cart: IProductExtended[] | undefined;
    setCart: Dispatch<SetStateAction<IProductExtended[] | undefined>>
}

function CheckoutPage({cart,setCart}:ICartProp) {
    const [filters, setFilters] = useState<IFilters>({name: null, category:null});

    useEffect(() => {
    }, [cart]);
    return (
        <div className="CheckoutPage">
            <CartProductsList cart={cart} setCart={setCart}/>
        </div>
    );
}

export default CheckoutPage;
