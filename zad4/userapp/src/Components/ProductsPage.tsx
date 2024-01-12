import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import '../Styles/App.css';
import ProductsList from "./ProductsList";
import {IFilters, IProduct, IProductExtended} from "../interfaces";
import Search from "./Search";

type ICartProp = {
    cart: IProductExtended[] | undefined;
    setCart: Dispatch<SetStateAction<IProductExtended[] | undefined>>
}

function ProductsPage({cart,setCart}:ICartProp) {
    const [filters, setFilters] = useState<IFilters>({name: null, category:null});

    useEffect(() => {
    }, [cart]);
    return (
        <div className="ProductsPage">
            <Search setFilters={setFilters}></Search>
            <ProductsList cart={cart} setCart={setCart} filters={filters}/>
        </div>
    );
}

export default ProductsPage;
