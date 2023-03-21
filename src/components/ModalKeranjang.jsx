import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useState } from 'react'
import { Modal, Button, Form } from "react-bootstrap"
import { numberWithCommas } from '../utils'
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";


export default class ModalKeranjang extends Component {
    render() {
        const keranjangDetail = this.props.keranjangDetail
        if (keranjangDetail) {
            return (
                <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{keranjangDetail.product.nama}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Harga :  <strong>Rp.{}</strong> */}
                        <Form onSubmit={this.props.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Total Harga</Form.Label>
                                <Form.Control type="text" value={numberWithCommas(this.props.totalHarga)} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Jumlah</Form.Label>
                                <br />
                                <Button variant="primary" size="sm" className="me-2" onClick={this.props.kurang}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <strong>{this.props.jumlah}</strong>
                                <Button variant="primary" size="sm" className="ms-2" onClick={this.props.tambah}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Keterangan</Form.Label>
                                <Form.Control as="textarea" rows={3} name="keterangan" placeholder="Isi keterangan pesanan anda" value={this.props.keterangan} onChange={(event) => this.props.changeHandler(event)} />
                            </Form.Group>
                            <Button variant="danger" onClick={() => this.props.hapusPesanan(keranjangDetail.id)}>
                                <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Batal
                        </Button>
                        <Button variant="primary" onClick={this.props.handleSubmit}>
                            Simpan
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }
}