import axios from "axios";
import client from '../apis/Client'
let refresh = false;
client.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {     
        refresh = true;
        console.log(localStorage.getItem('refresh_token'))
        const response = await client.post('/api/token/refresh/', {      
                     refresh: localStorage.getItem('refresh_token')
                     }, { headers: {'Content-Type': 'application/json'
                     }, withCredentials: true});    
        if (response.status === 200) {
            client.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;       
            localStorage.setItem('access_token', response.data.access);       
            localStorage.setItem('refresh_token', response.data.refresh);       
            return client(error.config);
        }  
    }
    refresh = false;
    return error;
});