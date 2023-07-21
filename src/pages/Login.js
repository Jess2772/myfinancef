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
//   const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // when you make get call, you should get user info?
  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  // function update_form_btn() {
  //   if (registrationToggle) {
  //     document.getElementById("form_btn").innerHTML = "Register";
  //     setRegistrationToggle(false);
  //   } else {
  //     document.getElementById("form_btn").innerHTML = "Log in";
  //     setRegistrationToggle(true);
  //   }
  // }
  const [data, setData] = useState([]);
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  var csrftoken = getCookie('csrftoken');
  function submitLogin(e) {
    e.preventDefault();
    console.log("here");
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      },
      {headers: {
        'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{csrftoken}}'
      }}
    ).then(function(res) {
      setCurrentUser(true);
      navigate('/welcome');
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