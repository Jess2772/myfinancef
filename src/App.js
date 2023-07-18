import './App.css';
import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">            
            <Navbar.Text>
              <Link to="/login" className="btn btn-outline-dark">Sign in</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <p style={{ fontSize: 50 }} className="center">
          <TypeAnimation
            sequence={[
              "Take control of YourFinance",
              1000,
              "Take control of yourself",
              1500,
              "Take control of your money",
              1500,
            ]}
            speed={45}
            repeat={Infinity}
            style={{ fontSize: '2em', paddingTop: '1em' }}
          />
        </p>
        <Link className="center" to="/register"><Button className="center" size="lg" type="submit">
          Get started
        </Button></Link>
      </div>
    </div>
    
  )
}

export default App;