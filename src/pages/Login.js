import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import client from '../apis/Client'
import { useNavigate } from "react-router-dom";
import jQuery from 'jquery'


function Login() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = async e => {
    e.preventDefault();
    const {data} = await client.post(
      "/api/token/",
      {
        email: email,
        password: password
      },
      { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
      }, withCredentials: true, crossDomain: true}
    )

    localStorage.clear();         
    localStorage.setItem('access_token', data.access);         
    localStorage.setItem('refresh_token', data.refresh);         
    client.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    window.location.href = '/'       
    //navigate('/home')
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