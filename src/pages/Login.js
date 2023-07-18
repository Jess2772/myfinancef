import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  //baseURL: "http://127.0.0.1:8000"
  baseURL: "https://myfinancejb-2225ee8966e8.herokuapp.com/"
});

function Login() {

  const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
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

//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = "Register";
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = "Log in";
//       setRegistrationToggle(true);
//     }
//   }

  function submitLogin(e) {
    e.preventDefault();
    console.log("here");
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }


  return (
    <div>
    <Navbar bg="light" variant="light">
        <Container>
            <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">            
                <Navbar.Text>
                <Link to="/register" className="btn btn-outline-dark">Sign up</Link>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
      </Navbar>
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
    </div>
  );
}

export default Login;