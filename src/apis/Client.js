import axios from "axios";

axios.defaults.withCredentials = true;

const client = axios.create({
    //baseURL: "http://127.0.0.1:8000",
    baseURL: "https://myfinancejb-2225ee8966e8.herokuapp.com",
    withCredentials: true,
  });
  
export default client;