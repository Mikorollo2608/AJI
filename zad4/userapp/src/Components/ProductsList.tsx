import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {find, filter, includes, isEqual} from 'lodash';
import {IFilters, IProduct, IProductExtended} from "../interfaces";

type IProductsListProps = {
    cart: IProductExtended[];
    setCart: Dispatch<SetStateAction<IProductExtended[]>>
    filters: IFilters;
}

type ICartProp = {
    cart: IProductExtended[];
    setCart: Dispatch<SetStateAction<IProductExtended[]>>
}

function addToCart(product: IProduct, {cart, setCart}: ICartProp) {
    if (cart === undefined) {
        setCart([{...product, quantity:1}]);
    } else if (find(cart, (cartProduct) => {
        return cartProduct.id === product.id
    }) === undefined) {
        setCart(cart?.concat([{...product, quantity:1}]));
    }
}

function changeQuantity(product:IProductExtended, delta:number){
    if(product.quantity+delta>0)product.quantity+=delta;
}

function ProductsList({cart, setCart, filters}: IProductsListProps) {
    const [products, setProducts] = useState<IProduct[]>();
    const [productsFiltered, setProductsFiltered] = useState<IProduct[]>();

    useEffect(() => {
        const filterName = filters ? filters.name : null;
        const filterCategory = filters ? filters.category : null;
        if (filterName && filterCategory) {
            setProductsFiltered(filter(products, (product) => {
                return includes(product.name.toLowerCase(), filterName.toLowerCase()) && isEqual(product.category, filterCategory);
            }))
        } else if (filterName === null && filterCategory) {
            setProductsFiltered(filter(products, (product) => {
                return isEqual(product.category, filterCategory);
            }))
        } else if (filterName && filterCategory === null) {
            setProductsFiltered(filter(products, (product) => {
                return includes(product.name.toLowerCase(), filterName.toLowerCase())
            }))
        } else {
            setProductsFiltered(products)
        }
    }, [filters, products]);

    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then(res => {
                setProducts(res.data);
                setProductsFiltered(products);
            })
    }, []);

    return (
        <div className="ProductsList mx-4 mt-4">
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {productsFiltered?.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.unitPrice.toFixed(2)} zł</td>
                            <td><Button variant="primary" onClick={() => {
                                addToCart(product, {cart, setCart})
                            }}>Add to cart</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductsList;