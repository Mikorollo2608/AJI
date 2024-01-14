import React, {useState} from 'react';
import {ICartProp, IOrderItem, IUserDetails} from "../interfaces";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as formik from 'formik';
import * as yup from 'yup';
import axios from "axios";

interface IRequestFailed{
    state: boolean,
    reason: string[] | null
}
function capitalizeFirstLetter(message:string | undefined) {
    if(message === undefined || message.length<1) return message;
    return message.charAt(0).toUpperCase() + message.slice(1);
}

function UserDetails({cart, setCart}: ICartProp) {
    const [requestSucceeded,setRequestSucceeded] = useState(false);
    const [requestFailed,setRequestFailed] = useState<IRequestFailed>({state:false, reason:null});
    const {Formik} = formik;
    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required().email(),
        phone: yup.string().required().matches(new RegExp("([1-9][0-9]{8})"), "Invalid phone number.")
            .min(9, "Invalid phone number.").max(9, "Invalid phone number.")
    });

    return (
        <div className="UserDetails">
            <Formik
                validationSchema={schema}
                initialValues={{
                    username:'',
                    email:'',
                    phone:'',
                }}
                onSubmit={(
                    values: IUserDetails,
                ) => {
                    let orderItems:IOrderItem[] = [];
                    cart.forEach((item) => {
                        orderItems.push({
                            id:item.id,
                            quantity:item.quantity
                        })
                    })
                        axios.post("http://localhost:3000/orders",{...values, products:orderItems})
                            .then(function (response) {
                                setCart([]);
                                setRequestSucceeded(true);
                            })
                            .catch(function (error) {
                                console.log(error.response.data);
                                let reason:string[] = [];
                                //@ts-ignore
                                error.response.data.forEach((item)=>{
                                    reason.push(item.msg);
                                });
                                setRequestFailed({state:true, reason:reason});
                            });
                }}
            >{props => (
                <Form noValidate onSubmit={props.handleSubmit} className="m-3 p-3">
                    <Row className="align-items-middle">
                        <Col>
                            <Form.Group controlId="searchFormUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.username} isInvalid={props.touched.username && !!props.errors.username} isValid={props.touched.username && !props.errors.username} name="username" type="text"/>
                                <Form.Control.Feedback type="invalid">{capitalizeFirstLetter(props.errors.username)}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col><Form.Group controlId="searchFormEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} isInvalid={props.touched.email && !!props.errors.email} isValid={props.touched.email && !props.errors.email} name="email" type="email"/>
                            <Form.Control.Feedback type="invalid">{capitalizeFirstLetter(props.errors.email)}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col> <Form.Group controlId="searchFormPhone">
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.phone} isInvalid={props.touched.phone && !!props.errors.phone} isValid={props.touched.phone && !props.errors.phone} name="phone" type="text"/>
                            <Form.Control.Feedback type="invalid">{capitalizeFirstLetter(props.errors.phone)}</Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="my-3 d-flex align-items-middle justify-content-start ">
                            <Button type="submit" variant="outline-primary" disabled={!(cart.length>0)}>Order</Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            {requestSucceeded && <h3>Your order was placed.</h3>}
            {requestFailed.state && <div>{requestFailed.reason?.map((item,key) => <h3 key={key}>{item}</h3>)}</div>}
        </div>
    );
}

export default UserDetails;
