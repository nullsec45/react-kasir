import { ListCategories, Hasil, Menus } from "../components"
import { Row, Col, Container } from "react-bootstrap"
import React, { Component } from 'react'
import { API_URL } from "../utils/constant"
import axios from "axios"
import swal from "sweetalert"
import "../index.css"

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menus: [],
            isiKeranjang: [],
            categoriYangDipilih: "Makanan"
        }
    }

    componentDidMount() {
        axios.get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error)
            })
        axios.get(API_URL + "keranjangs")
            .then(res => {
                const isiKeranjang = res.data;
                this.setState({ isiKeranjang });
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate(prevState) {
        if (this.state.isiKeranjang !== prevState.isiKeranjang) {
            axios.get(API_URL + "keranjangs")
                .then(res => {
                    const isiKeranjang = res.data;
                    this.setState({ isiKeranjang });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    changeCategory = (value) => {
        this.setState({
            categoriYangDipilih: value,
            menus: []
        })

        axios.get(API_URL + "products?category.nama=" + value)
            .then(res => {
                const menus = res.data;
                this.setState({ menus });
            })
            .catch(error => {
                console.log(error)
            })
    }

    masukKeranjang = (value) => {
        axios.get(API_URL + "keranjangs?product.id=" + value.id)
            .then((res) => {
                if (res.data.length === 0) {
                    const keranjang = {
                        jumlah: 1,
                        total_harga: value.harga,
                        product: value
                    }
                    axios.post(API_URL + "keranjangs", keranjang).then(res => {
                        swal({
                            title: "Sukses",
                            text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                            icon: "success",
                            timer: 1500
                        });
                    }).catch(error => {
                        console.log("Error bro", error);
                    })
                } else {
                    const keranjang = {
                        jumlah: res.data[0].jumlah + 1,
                        total_harga: res.data[0].total_harga + value.harga,
                        product: value
                    }
                    axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang).then(res => {
                        swal({
                            title: "Sukses",
                            text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                            icon: "success",
                            timer: 1500
                        });
                    }).catch(error => {
                        console.log("Error bro", error);
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        const { menus, categoriYangDipilih, isiKeranjang } = this.state
        return (
            <div div className="App" >
                <div className="mt-2">
                    <Container fluid>
                        <Row>
                            <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
                            <Col md={6}>
                                <h5 className='text-center'><strong>Daftar Produk</strong></h5>
                                <hr />
                                <Row>
                                    {menus && menus.map((menu) => (
                                        <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang}></Menus>
                                    ))}
                                </Row>
                            </Col>
                            <Hasil isiKeranjang={isiKeranjang} />
                        </Row>
                    </Container>
                </div>
            </div >
        )
    }
}


