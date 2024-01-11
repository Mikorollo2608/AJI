import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {find} from 'lodash';
import {IProduct} from "./interfaces";

type ICartProp = {
    cart: IProduct[] | undefined;
    setCart: Dispatch<SetStateAction<IProduct[] | undefined>>
}

function addToCart(product:IProduct, {cart, setCart}: ICartProp){
    if(cart === undefined){
        setCart([product]);
    }else if(find(cart, (cartProduct) =>{ return cartProduct.id === product.id})!== undefined){
        setCart(cart?.concat([product]));
    }
}

function ProductsList({cart, setCart}: ICartProp) {
    const [products, setProducts] = useState<IProduct[]>();

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then(res => {
                setProducts(res.data);
            })
    },[])

    return (
        <div className="ProductsList">
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Add to cart</th>
                    </tr>
                </thead>
                <tbody>
                {products?.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.description}</td>
                            <td>{val.unitPrice}</td>
                            <td>{key}</td>
                            <td><Button variant="primary" onClick={ () => {console.log(val); addToCart(val,{cart,setCart})}}>Add to cart</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Add to cart</th>
                </tr>
                </thead>
                <tbody>
                {cart?.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.description}</td>
                            <td>{val.unitPrice}</td>
                            <td>{key}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}
export default ProductsList;