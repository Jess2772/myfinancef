import Navigation from "../components/Navigation";
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Spendings() {
    const [spending, setUserSpending] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {
            (async () => { 
                const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                return await client.post(
                    'api/user/spending',
                    {
                        user_id: user_id
                    }, 
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }}, { withCredentials: true, crossDomain: true }   
                ).then((res) => {
                    setUserSpending(res.data)
                   
                }).catch((err)=> {
                    console.log(err)
                })

            })
        ()};     
    }, []);
    // console.log(spending);
    return (
        <div>
            <Navigation></Navigation>
            <p>List all transactions from this month, then allow them to filter by category. Also allow filter by month (historicall) but need to know which months are available. So like find the min date from this persons transacitons? Need to be able to display x records then give a button to go next x entries (and backwards).</p>
            <ul>
                {
                    spending.map((transaction) =>
                        <tr key={transaction.transaction_id}>
                            <th>{transaction.merchant}</th>
                            <th>{transaction.category}</th>
                            <th>{transaction.amount}</th>
                            <th>{transaction.transaction_date}</th>
                            <th>{transaction.pymt_method_full}</th>
                        </tr>
                        //<li key={transaction.transaction_id}>{transaction.amount}{transaction.merchant}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default Spendings;