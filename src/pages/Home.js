// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
// Define the Login function.
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
    
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
            <div className="form-signin mt-5 text-center">
                <h3>Hi {username} </h3>
            </div>
        )
}

export default Home;