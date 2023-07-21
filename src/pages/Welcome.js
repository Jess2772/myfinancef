import {useEffect, useState} from 'react';
import client from '../apis/Client'
import axios from 'axios';
import jQuery from 'jquery'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
function Welcome() {
    const [data, setData] = useState([]);
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    const getData = async () => {
        const { data } = await client.get(`api/user`, {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }, withCredentials: true});
        setData(data);
    };

    useEffect(() => {
        getData();
      }, []);

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Link to="/" style={{ textDecoration: 'none' }}><Navbar.Brand>MyFinance</Navbar.Brand></Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">            
                        <Navbar.Text>
                        <Link to="/" className="btn btn-outline-dark">Settings</Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className="center">Welcome back, {data.user.username} </h1>
            <h1 className="center">I'd like to....</h1>
            <h1 className="center">Put buttons that lead to the other functionality</h1>
        </div>
    )
}

export default Welcome;