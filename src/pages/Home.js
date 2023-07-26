// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom";
import Navigation from '../components/Navigation'
import Button from '@mui/material/Button';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PaidIcon from '@mui/icons-material/Paid';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
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
                        <Button endIcon={<PointOfSaleIcon />} variant="contained" size="large" className="center me-2"> Record Transactions </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/spendings">
                        <Button endIcon={<RequestQuoteIcon />} variant="contained" size="large" className="center me-2"> View My Spendings </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/budget">
                        <Button endIcon={<AccountBalanceWalletIcon />} variant="contained" size="large" className="center me-2"> View/Update My Budget </Button>
                    </Link>
                </div>
                
            </div>

        </div>
    )
}

export default Home;