import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from "react-bootstrap"
import { numberWithCommas, API_URL } from '../utils';
import TotalHarga from "./TotalHarga";
import ModalKeranjang from './ModalKeranjang';
import axios from "axios"



export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            jumlah: 0,
            keranjangDetail: false,
            totalHarga: 0,

        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }
    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }
        axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data).then(res => {
            swal({
                title: "Update Pesanana.",
                text: "Update Pesanan Berhasil!. " + data.product.nama,
                icon: "success",
                timer: 1500
            });
        }).catch(error => {
            console.log("Error bro", error);
        })
    }

    hapusPesanan = (id) => {

        this.handleClose();

        axios.delete(API_URL + "keranjangs/" + id).then(res => {
            swal({
                title: "Hapus pesanan",
                text: "Pesanan " + this.state.keranjangDetail.product.nama + " berhasil dihapus.",
                icon: "success",
                timer: 1500
            });
        }).catch(error => {
            console.log("Error bro", error);
        })
    }

    render() {
        const { isiKeranjang } = this.props;
        return (
            <Col md={3} mt="2" >
                <h5 className='text-center'><strong>Hasil</strong></h5>
                <hr />
                {isiKeranjang.length !== 0 && (
                    <ListGroup>
                        <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                        {isiKeranjang.map((menuKeranjang) => (
                            <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
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
                <TotalHarga keranjangs={isiKeranjang} />
            </Col >
        );
    }
}