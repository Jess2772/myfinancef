import '../App.css';
import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import client from '../apis/Client'
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState();

    function submitRegistration(e) {
        e.preventDefault();
        console.log("register")
        client.post(
        "/api/register",
        {
            email: email,
            username: username,
            password: password
        }
        ).then(function(res) {
        client.post(
            "/api/login",
            {
            email: email,
            password: password
            }
        ).then(function(res) {
            navigate('/welcome');
            setCurrentUser(true);
        });
    });
    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav> 
                        <Nav.Link href="/login">Sign in</Nav.Link>
                    </Nav>            
                    {/* <Navbar.Text>
                    <Link to="/login" className="btn btn-outline-dark">Log in</Link>
                    </Navbar.Text> */}
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="center">
                <Form onSubmit={e => submitRegistration(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
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
        
    )

}

export default Register;