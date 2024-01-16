import {ICategory, IError, IProduct} from "../interfaces";
import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";
import {isEqual, without, find} from "lodash";
import '../Styles/App.css';

interface IProductProps {
    product: IProduct
    products: IProduct[]
    setProducts: Dispatch<SetStateAction<IProduct[]>>
    categories: ICategory[]
    setShowAlert: Dispatch<SetStateAction<boolean>>
    setErrors: Dispatch<SetStateAction<IError[]>>
}

function Product({product, products, setProducts, categories, setShowAlert, setErrors}: IProductProps) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [productEdited, setProductEdited] = useState<IProduct>({...product});
    type ObjectKey = keyof typeof productEdited;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as ObjectKey;
        const value = e.target.value === "" ? productEdited[key] : e.target.value;
        setProductEdited({...productEdited, [key]: +value});
    }

    const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const categoryName = e.target.value;
        const category = find(categories, (category) => {
            return category.name === categoryName
        })
        if (category !== undefined) setProductEdited({...productEdited, category: category});
    }

    const editProduct = () => {
        if (isEqual(product, productEdited)) {
            setIsBeingEdited(false);
            return;
        }
        let productToPost: any = {...productEdited};
        delete productToPost['id'];
        axios.put(`http://localhost:3000/products/${productEdited.id}`, productToPost)
            .then(() => {
                let productsCopy = without(products, product);
                product = {...productEdited};
                productsCopy.push(product);
                setProducts(productsCopy);
                setIsBeingEdited(false);
            })
            .catch((error) => {
                setShowAlert(true);
                setErrors(error.response.data)
            })
    }

    // useEffect(() => {
    //     console.log(productEdited);
    // }, [productEdited]);

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td className="w-25">{product.description}</td>
            {!isBeingEdited && <td>{product.unitPrice.toFixed(2)} zł</td>}
            {isBeingEdited && <td>
                <Form.Control
                    className="position-relative translate-middle-x start-50"
                    type="number"
                    name="unitPrice"
                    defaultValue={productEdited.unitPrice.toFixed(2)}
                    onChange={onChange}
                ></Form.Control>
            </td>}
            {!isBeingEdited && <td>{product.unitWeight.toFixed(2)} g</td>}
            {isBeingEdited && <td>
                <Form.Control
                    className="position-relative translate-middle-x start-50"
                    type="number"
                    name="unitWeight"
                    defaultValue={productEdited.unitWeight.toFixed(2)}
                    onChange={onChange}
                ></Form.Control>
            </td>}
            {!isBeingEdited && <td>{product.category.name}</td>}
            {isBeingEdited && <td>
                <Form.Select
                    onChange={onChangeCategory}
                    className="position-relative translate-middle-x start-50"
                    name="category"
                    defaultValue={productEdited.category.name}
                >
                    {categories?.map((category) => <option
                        key={category.id}>{category.name}</option>)}
                </Form.Select>
            </td>}
            <td>
                <Row>
                    {!isBeingEdited && <Col><Button variant="primary"  onClick={() => setIsBeingEdited(true)}>Edit</Button></Col>}
                    {isBeingEdited && <Col><Button variant="success" onClick={editProduct}>Save</Button></Col>}
                    {isBeingEdited &&
                        <Col><Button variant="danger" onClick={() => setIsBeingEdited(false)}>X</Button></Col>}
                </Row>
            </td>
        </tr>
    )
}

export default Product