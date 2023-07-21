import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import { Link, Route, Routes } from "react-router-dom";

function Navigation() {   
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {     
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true); 
      }    
    }, [isAuth]);     

    return ( 
      <div>      
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">MyFinance</Navbar.Brand>  
                <Nav className="me-auto"> 
                    {isAuth ? <Link to="/">Home</Link> : null}
                </Nav>
                <Nav>
                    {isAuth ? <Link to="/logout">Sign out</Link> :  
                            <Link to="/login">Sign in</Link>}
                </Nav>
            </Container>
        </Navbar>
       </div>
     );
}

export default Navigation;