import React, {Dispatch, FormEventHandler, SetStateAction, useEffect, useState} from 'react';
import {ICategory, IFilters} from "../interfaces";
import {find} from "lodash";
import axios from "axios";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface ISearchProps {
    setFilters: Dispatch<SetStateAction<IFilters>>
}

function Search({setFilters}: ISearchProps) {
    const [categories, setCategories] = useState<ICategory[]>();
    const [formFilters, setFormFilters] = useState<IFilters>({name: null, category: null});

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === "" ? null : e.target.value;
        setFormFilters({...formFilters, name: value});
    }

    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const formCategory = find(categories, (category) => {
            return value === category.name
        });
        if (formCategory === undefined) {
            setFormFilters({...formFilters, category: null});
        } else {
            setFormFilters({...formFilters, category: formCategory});
        }
    }

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();
        setFilters(formFilters);
    }

    useEffect(() => {
        axios.get("http://localhost:3000/categories")
            .then(res => {
                setCategories(res.data);
            })
    }, []);
    return (
        <div className="Search">
            <h1 id="Search" className="mx-4 my-2">Search:</h1>
            <Form onSubmit={onFormSubmit}>
                <Row className="mx-3 my-1 align-items-center">
                    <Col>
                        <Form.Group controlId="searchFormName">
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Label>Name:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control onChange={onNameChange} name="name" type="text"/>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="searchFormCategory">
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Label>Category:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select onChange={onCategoryChange} name="category" defaultValue="">
                                        <option></option>
                                        {categories?.map((category) => <option
                                            key={category.id}>{category.name}</option>)}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" variant="outline-primary">Search</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Search;
