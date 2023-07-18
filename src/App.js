import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Register from './pages/Register'
import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
  //baseURL: "https://myfinancejb-2225ee8966e8.herokuapp.com/"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);


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