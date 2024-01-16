import React, {ChangeEvent, useEffect, useState} from "react";
import {IOrder, IStatus} from "../interfaces";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import {filter, find, sortBy, without} from "lodash";
import ModalOrders from "./ModalOrders";

function OrdersPage(){
    const [statuses,setStatuses] = useState<IStatus[]>([]);
    const [orders,setOrders] = useState<IOrder[]>([]);
    const [ordersFiltered,setOrdersFiltered] = useState<IOrder[]>([]);
    const [statusFilter,setStatusFilter] = useState<IStatus>();
    const [displayOrder,setDisplayOrder] = useState<IOrder>();
    const [showModal, setShowModal] = useState(false);

    const changeStatusOrder = (order:IOrder, newStatus:IStatus) => {
        axios.patch(`http://localhost:3000/orders/${order.id}`,
            {
                op:"replace",
                path:"status",
                value:newStatus
            })
            .then((response)=>{
                let orderCopy = without(orders, order);
                orderCopy.push(response.data);
                setOrders(orderCopy);
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    const changeFilter = (event:ChangeEvent<HTMLSelectElement>) => {
        let value = event.target.value;
        let newStatus = find(statuses, (status) => {return status.status === value});
        setStatusFilter(newStatus);
    }

    useEffect(() => {
        axios.get("http://localhost:3000/status")
            .then((response)=>{
                setStatuses(response.data);
            });
        axios.get("http://localhost:3000/orders")
            .then((response)=>{
                setOrders(response.data);
                setOrdersFiltered(response.data);
            })
    }, []);

    useEffect(() => {
        if(statusFilter !== undefined){
            setOrdersFiltered(filter(orders,(order)=>{
                return order.status.id === statusFilter.id
            }))
        }
        else {
            setOrdersFiltered(orders);
        }
    }, [orders,statusFilter]);

    return (
        <div className="OrdersPage" >
            <ModalOrders show={showModal} setShow={setShowModal} order={displayOrder}/>
            <Form.Group as={Row} className="m-3" controlId="formStatus">
                <Form.Label column className="text-end">
                    Status
                </Form.Label>
                <Col >
                    <Form.Select
                        onChange={changeFilter}
                        name="status"
                        defaultValue=""
                    >
                        <option></option>
                        {statuses?.map((status) => <option
                            key={status.id}>{status.status}</option>)}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Table striped hover>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Phone</td>
                    <td>Date of approval</td>
                    <td>Details</td>
                    <td>Status</td>
                    <td>Change status</td>
                </tr>
                </thead>
                <tbody>
                    {sortBy(ordersFiltered,(order)=>order.id).map((order:IOrder) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.username}</td>
                                <td>{order.email}</td>
                                <td>{order.phone}</td>
                                {order.dateOfApproval === null && <td></td>}
                                {order.dateOfApproval !== null && <td>{(new Date(order.dateOfApproval)).toLocaleString()}</td>}
                                <td><Button variant="primary" onClick={()=>{setDisplayOrder(order); setShowModal(true)}}>Details</Button></td>
                                <td>{order.status.status}</td>
                                <td>
                                    <Row>
                                        {order.status.id === 1 && <Col><Button variant="primary" onClick={()=>changeStatusOrder(order,statuses[1])} >APPROVE</Button></Col>}
                                        {order.status.id === 2 && <Col><Button variant="primary" onClick={()=>changeStatusOrder(order,statuses[3])}>COMPLETE</Button></Col>}
                                        {order.status.id === 2 && <Col><Button variant="primary"  onClick={()=>changeStatusOrder(order,statuses[2])}>CANCEL</Button></Col>}
                                    </Row>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default  OrdersPage;