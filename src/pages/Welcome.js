import {useEffect, useState} from 'react';
import client from '../apis/Client'
import axios from 'axios';
import jQuery from 'jquery'
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
            //'X-CSRFToken': csrftoken
        }, withCredentials: true});
        setData(data);
    };

    useEffect(() => {
        getData();
      }, []);   

    return <div>{JSON.stringify(data)}</div>;

}

export default Welcome;