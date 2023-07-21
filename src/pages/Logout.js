import {useEffect, useState} from "react"
import client from "../apis/Client";
const Logout = () => {   
    useEffect(() => {       
        (async () => {         
            try {
                const {data} = await  
                client.post('/api/logout',{
                 refresh_token:localStorage.getItem('refresh_token')
                 } ,{headers: {'Content-Type': 'application/json'}},  
                 {withCredentials: true, crossDomain: true});           
                localStorage.clear();
            client.defaults.headers.common['Authorization'] = null;
           window.location.href = '/'
           } catch (e) {
             console.log('logout not working', e)
           }
         })();
    }, []);    return (
       <div></div>
     )
}

export default Logout;