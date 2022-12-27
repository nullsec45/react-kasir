import { NavbarComponent, ListCategories, Hasil, Menus } from "./components"
import { Row, Col, Container } from "react-bootstrap"
import React, { Component } from 'react'
import { API_URL } from "./utils/constant"
import axios from "axios"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + "products")
      .then(res => {
        console.log("Response:", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    const { menus } = this.state
    return (
      <div div className="App" >
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategories />
              <Col md={6}>
                <h4 className='text-center'><strong>Daftar Produk</strong></h4>
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
      </div>
    )
  }
}


