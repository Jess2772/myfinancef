import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    //baseURL: "http://127.0.0.1:8000",
    //baseURL: "https://myfinancejb-2225ee8966e8.herokuapp.com",
    baseUrl: "https://104.196.30.220:443",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'xsrftoken',
  });
  
export default client;
