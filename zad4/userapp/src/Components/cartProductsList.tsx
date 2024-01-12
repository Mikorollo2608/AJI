import React, {Dispatch, SetStateAction} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {filter, isEqual} from 'lodash';
import {IProductExtended} from "../interfaces";

type ICartProp = {
    cart: IProductExtended[] | undefined;
    setCart: Dispatch<SetStateAction<IProductExtended[] | undefined>>
}

function removeFromCart(product: IProductExtended, {cart, setCart}: ICartProp) {
    setCart(filter(cart, (cartProduct) => {return !isEqual(cartProduct,product)}));
}

function CartProductsList({cart, setCart}: ICartProp) {
    return (
        <div className="CartProductsList mx-4 mt-4">
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {cart?.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unitPrice.toFixed(2)} zł</td>
                            <td><Button variant="danger" onClick={() => {
                                removeFromCart(product, {cart, setCart})
                            }}>Remove</Button></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default CartProductsList;