import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from "react-bootstrap"
import { numberWithCommas } from '../utils/numberFormat';

export default class Hasil extends Component {
    render() {
        const { isiKeranjang } = this.props;
        console.log(isiKeranjang);
        return (
            <Col md={3} mt="2" >
                <h5 className='text-center'><strong>Hasil</strong></h5>
                <hr />
                {isiKeranjang.length !== 0 && (
                    <ListGroup>
                        {isiKeranjang.map((menuKeranjang) => (
                            <ListGroup.Item>
                                <Row>
                                    <Col xs={2}>
                                        <h4><Badge pill bg="success">{menuKeranjang.jumlah}</Badge></h4>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p>Rp.{numberWithCommas(menuKeranjang.product.harga)}</p>
                                    </Col>
                                    <Col>
                                        <strong>Rp.{numberWithCommas(menuKeranjang.total_harga)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col >
        );
    }
}