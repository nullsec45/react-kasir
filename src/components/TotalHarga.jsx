import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { API_URL, numberWithCommas } from '../utils'
import { Navigate } from 'react-router-dom';

export default class TotalHarga extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/sukses" />;
        }

        const submitTotalHarga = (totalHarga) => {
            const pesanan = {
                total_harga: totalHarga,
                menus: this.props.keranjangs
            }

            axios.post(API_URL + "pesanans", pesanan).then((res) => {
                this.setState({ redirect: true });
            });
        }

        const totalHarga = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga
        }, 0)
        return (
            <Row>
                <Col className="mt-4">
                    <h4>Total Harga : Rp.{numberWithCommas(totalHarga)}</h4>
                    <Button varian="primary" block className="mb-2 col-12" onClick={() => submitTotalHarga(totalHarga)}><FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong></Button>
                </Col>
            </Row >
        )

    }
}
