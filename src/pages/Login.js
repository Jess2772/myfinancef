import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import client from '../apis/Client'
import { useNavigate } from "react-router-dom";
import jQuery from 'jquery'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
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
    //window.location.href = '/'       
    navigate('/home')
  }


  return (
    <div>
    <Navbar bg="light" variant="light">
        <Container>
            <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">            
                <Navbar.Text>
                <Link to="/register"><Button variant="contained">Sign Up</Button></Link>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
      </Navbar>
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormControl placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}>
                <TextField variant="outlined" label="Email" type="email" />
                <FormHelperText id="my-helper-text">
                  We'll never share your email with anyone else.
                </FormHelperText>
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
  );
}

export default Login;