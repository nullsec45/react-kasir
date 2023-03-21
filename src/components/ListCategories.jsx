import React, { Component } from 'react'
import { Col, ListGroup } from "react-bootstrap";
import axios from 'axios';
import { API_URL } from '../utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons"

const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="me-2"></FontAwesomeIcon>
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="me-2"></FontAwesomeIcon>
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="me-2"></FontAwesomeIcon>
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        axios.get(API_URL + "categories").then(res => {
            const categories = res.data;
            this.setState({ categories });
        }).catch(error => {
            console.log(`Error ngab : ${error}`)
        })
    }
    render() {
        const { categories } = this.state
        const { changeCategory, categoriYangDipilih } = this.props
        return (
            <Col md={3} mt="2" >
                <h5 className='text-center'><strong>Daftar Kategori</strong></h5>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categoriYangDipilih === category.nama && "active"} style={{ cursor: "pointer" }}> <Icon nama={category.nama} />{category.nama}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Col >
        )
    }
}