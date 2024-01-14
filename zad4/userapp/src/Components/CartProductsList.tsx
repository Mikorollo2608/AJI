import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {filter, isEqual} from 'lodash';
import {IProductExtended} from "../interfaces";

type ICartProp = {
    cart: IProductExtended[];
    setCart: Dispatch<SetStateAction<IProductExtended[]>>
}

function changeQuantity(cart:IProductExtended[],setCart:Dispatch<SetStateAction<IProductExtended[]>>,product:IProductExtended, delta:number){
    if(product.quantity+delta>0){
        const nextCart = cart.map((cartProduct) => {
            if (isEqual(cartProduct,product)) {
                // Increment the clicked counter
                return {...product,quantity:product.quantity+delta}
            } else {
                // The rest haven't changed
                return cartProduct;
            }
        });
        setCart(nextCart);
    }
}

function removeFromCart(product: IProductExtended, {cart, setCart}: ICartProp) {
    setCart(filter(cart, (cartProduct) => {return !isEqual(cartProduct,product)}));
}

function CartProductsList({cart, setCart}: ICartProp) {
    const [totalPrice,setTotalPrice] = useState<number>(0);
    useEffect(() => {
        setTotalPrice(()=>{
            let newTotal = 0;
            cart.forEach((item) => {
                newTotal+=item.quantity * item.unitPrice;
            })
            return newTotal;
        })
    }, [cart]);
    return (
        <div className="CartProductsList mx-4 mt-4">
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {cart?.map((product) => {
                    return (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>
                                <Button onClick={()=>{changeQuantity(cart,setCart,product,-1)}}  variant="outline-secondary">-</Button>
                                <text className="mx-2">{product.quantity}</text>
                                <Button onClick={()=>{changeQuantity(cart,setCart,product,1)}}  variant="outline-secondary">+</Button>
                            </td>
                            <td>{(product.unitPrice*product.quantity).toFixed(2)} zł</td>
                            <td><Button variant="danger" onClick={() => {
                                removeFromCart(product, {cart, setCart})
                            }}>Remove</Button></td>
                        </tr>
                    )
                })}
                <tr>
                    <td>Total:</td>
                    <td colSpan={3}>{totalPrice.toFixed(2)} zł</td>
                </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default CartProductsList;