import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    //baseURL: "http://127.0.0.1:8000",
    baseURL: "https://107.22.57.98:443",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'xsrftoken',
  });
  
export default client;
