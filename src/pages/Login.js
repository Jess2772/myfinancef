import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import client from '../apis/Client'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

            <FormGroup className="mt-4">
              <FormControl variant="outlined" value={password}>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
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