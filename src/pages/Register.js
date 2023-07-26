import '../App.css';
import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import client from '../apis/Client'
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitRegistration = async e => {
        e.preventDefault();
        const {data1} = await client.post(
            "/api/register",
            {
                email: email,
                username: username,
                password: password
            },
            { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, withCredentials: true, crossDomain: true}
        )
        
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
        navigate('/home')
      }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav> 
                        <Link to="/login"><Button variant="contained">Sign in</Button></Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="center">
                <Form onSubmit={e => submitRegistration(e)}>
                    <FormGroup className="mb-3" controlId="formBasicEmail">
                        <FormControl placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}>
                            <TextField variant="outlined" label="Email" type="email" />
                            <FormHelperText id="my-helper-text">
                            We'll never share your email with anyone else.
                            </FormHelperText>
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="formBasicUsername">
                        <FormControl placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}>
                            <TextField variant="standard" label="Username" />
                        </FormControl>
                    </FormGroup>

                    <FormGroup className="mt-4" controlId="formBasicPassword">
                        <FormControl placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}>
                            <TextField variant="filled" label="Password" type="password" />
                        </FormControl>
                    </FormGroup>

                    <Button variant="contained" className="mt-3 center" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>   
        </div>
    )
}

export default Register;