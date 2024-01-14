import {ICategory, IProduct} from "../interfaces";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Alert, Button, Col, Form, Overlay, Row, Tooltip} from "react-bootstrap";

interface IProductProps{
    product:IProduct
    categories:ICategory[]
}


function Product({product,categories}:IProductProps){
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [productEdited, setProductEdited] = useState<IProduct>({...product});
    type ObjectKey = keyof typeof productEdited;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as ObjectKey;
        const value = e.target.value === "" ? productEdited[key] : e.target.value;
        setProductEdited({...productEdited, [key]:+value});
    }

    // useEffect(() => {
    //     console.log(productEdited);
    // }, [productEdited]);

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            {!isBeingEdited && <td>{product.unitPrice.toFixed(2)} zł</td>}
            {isBeingEdited && <td>
                <Form.Control
                    type="number"
                    name="unitPrice"
                    defaultValue={productEdited.unitPrice.toFixed(2)}
                    onChange={onChange}
                ></Form.Control>
            </td>}
            {!isBeingEdited && <td>{product.unitWeight.toFixed(2)} zł</td>}
            {isBeingEdited && <td>
                <Form.Control
                    type="number"
                    name="unitWeight"
                    defaultValue={productEdited.unitWeight.toFixed(2)}
                    onChange={onChange}
                ></Form.Control>
            </td>}
            {!isBeingEdited && <td>{product.category.name}</td>}
            {isBeingEdited && <td>
                <Form.Select
                    name="category"
                    defaultValue={productEdited.category.name}
                >
                    {categories?.map((category) => <option
                        key={category.id}>{category.name}</option>)}
                </Form.Select>
            </td>}
            <td>
                {!isBeingEdited && <Button variant="primary" onClick={()=>setIsBeingEdited(true)}>Edit</Button>}
                {isBeingEdited && <Button variant="success" onClick={()=>{setIsBeingEdited(false)}}>Save</Button>}
            </td>
        </tr>
    )
}

export default Product