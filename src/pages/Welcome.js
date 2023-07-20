import {useEffect, useState} from 'react';
import client from '../apis/Client'
import axios from 'axios';
function Welcome() {
    const [data, setData] = useState([]);
    const getData = async () => {
        const { data } = await client.get(`api/user`, {withCredentials: true});
        setData(data);
    };

    useEffect(() => {
        getData();
      }, []);   

    return <div>{JSON.stringify(data)}</div>;

}

export default Welcome;