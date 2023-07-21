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
                    {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null}
                </Nav>
                <Nav>
                    {isAuth ? <Nav.Link href="/logout">Sign out</Nav.Link> :  
                            <Nav.Link href="/login">Sign in</Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
       </div>
     );
}

export default Navigation;