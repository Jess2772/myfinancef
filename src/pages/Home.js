// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation'
import Button from 'react-bootstrap/Button';
const Home = () => {     
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {         
            (async () => {           
                try {             
                    const {data} = await client.get(   
                        'api/home', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }}
                    );
                    setMessage(data.message);          
                } catch (e) {
                    console.log('not auth')
          }         
          })()};     
    }, []);
    const username = jwt_decode(localStorage.getItem('access_token')).username
    return (
        
        <div>
            <Navigation></Navigation>
            <div>
                <h2 className="center">Hi {username}. How may we assist you today? </h2>
                <p className="center">{message}</p>
                <div className="center">
                    <Link style={{ textDecoration: 'none'}} to="/transactions">
                        <Button variant= "outline-primary" className="center me-2" size="lg"> Record Transactions </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/spendings">
                        <Button variant= "outline-primary" className="center me-2" size="lg"> View My Spendings </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/budget">
                        <Button variant= "outline-primary" className="center me-2" size="lg"> View/Update My Budget </Button>
                    </Link>
                </div>
                
            </div>

        </div>
    )
}

export default Home;