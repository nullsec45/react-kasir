import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";
// import "./App.css";


export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/sukses" element={<Sukses />} exact />
          </Routes>
        </main>
      </Router >
    )
  }
}