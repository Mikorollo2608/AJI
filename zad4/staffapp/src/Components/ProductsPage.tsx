import React, {useEffect, useState} from 'react';
import '../Styles/App.css';
import {Table} from "react-bootstrap";
import axios from "axios";
import {ICategory, IError, IProduct} from "../interfaces";
import Product from "./Product";
import AlertDismissibleExample from "./AlertDIsmissable";
import {sortBy} from "lodash";


function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [showAlert, setShowAlert] = useState(true);
    const [errors, setErrors] = useState<IError[]>([])
    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then(res => {
                setProducts(res.data);
            })
        axios.get("http://localhost:3000/categories")
            .then(res => {
                setCategories(res.data);
            })
    }, []);

    return (
        <div className="ProductsPage">
            <AlertDismissibleExample show={showAlert} setShow={setShowAlert} errors={errors}/>
            <Table striped hover>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Unit Price</td>
                        <td>Unit Weight</td>
                        <td>Category</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {sortBy(products, (product) => {return product.id}).map((product) => {
                    return (<Product key={product.id} product={product} products={products}
                                     setProducts={setProducts} categories={categories}
                                     setShowAlert={setShowAlert} setErrors={setErrors}/>)
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductsPage;