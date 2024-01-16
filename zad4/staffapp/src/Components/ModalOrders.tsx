import {Dispatch, SetStateAction, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {IOrder} from "../interfaces";
import {Table} from "react-bootstrap";

interface IModalProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    order: IOrder | undefined
}

function ModalOrders({show,setShow,order}:IModalProps) {
    const handleClose = () => setShow(false);

    const totalPrice = () => {
        let total=0;
        order?.orderItems.forEach((orderItem)=>{total+=(orderItem.unitPrice*orderItem.quantity)})
        return total;
    }

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order {order?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped hover>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Unit price</td>
                            <td>Unit weight</td>
                            <td>Quantity</td>
                        </tr>
                    </thead>
                    <tbody>
                        {order?.orderItems.map((orderItem)=>{
                            return (
                                <tr key={orderItem.id}>
                                    <td>{orderItem.id}</td>
                                    <td>{orderItem.name}</td>
                                    <td>{orderItem.description}</td>
                                    <td>{orderItem.unitPrice} zł</td>
                                    <td>{orderItem.unitWeight} g</td>
                                    <td>{orderItem.quantity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <span>Total: {totalPrice().toFixed(2)} zł</span>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalOrders;