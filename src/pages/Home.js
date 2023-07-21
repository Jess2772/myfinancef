// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
// Define the Login function.
import jwt_decode from "jwt-decode"
const Home = () => {     
    const [message, setMessage] = useState('');
    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            window.location.href = '/login'
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
        const userid = jwt_decode(localStorage.getItem('access_token')).user_id
        return (
            <div className="form-signin mt-5 text-center">
                <h3>Hi {message}, {userid}</h3>
            </div>
        )
}

export default Home;