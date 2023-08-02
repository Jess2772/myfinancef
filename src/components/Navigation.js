import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

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
                    {isAuth ? <Link to="/home"><Button variant="contained">Home</Button></Link> : null}
                </Nav>
                <Nav>
                    {isAuth ? <Link to="/logout"><Button variant="contained">Sign out</Button></Link> :  
                            <Link to="/login"><Button variant="contained">Sign in</Button></Link>}
                </Nav>
            </Container>
        </Navbar>
       </div>
     );
}

export default Navigation;