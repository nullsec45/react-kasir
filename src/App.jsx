import { NavbarComponent, ListCategories, Hasil, Menus } from "./components"
import { Row, Col, Container } from "react-bootstrap"
import React, { Component } from 'react'
import { API_URL } from "./utils/constant"
import axios from "axios"
import "./index.css"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
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

  render() {
    const { menus, categoriYangDipilih } = this.state
    return (
      <div div className="App" >
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
              <Col md={6}>
                <h5 className='text-center'><strong>Daftar Produk</strong></h5>
                <hr />
                <Row>
                  {menus && menus.map((menu) => (
                    <Menus key={menu.id} menu={menu}></Menus>
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div >
    )
  }
}


