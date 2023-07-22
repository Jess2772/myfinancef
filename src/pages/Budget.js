// imports
import Navigation from "../components/Navigation";
// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
function Budget() {
    const [budget, setBudget] = useState('');
    const [activeBudget, setActiveBudget] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {         
            (async () => {           
                    const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                    return await client.post(   // TODO: RETURN!?
                        'api/user/budget',
                        {
                            user_id: user_id
                        }, 
                        { headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }}, { withCredentials: true, crossDomain: true }   
                    ).then((res) => {
                        setBudget(res.data)
                    }).catch((err)=> {
                        console.log("gg")
                        setActiveBudget(false); 
                    })
            })
        ()};     
    }, []);
    return (
        <div>
            <Navigation></Navigation>
            {
                activeBudget ? (
                    <div>
                        <p className="center">Budget: {budget.budget} ({budget.frequency})</p>
                        <p className="center">This page should have all the values displayed in their respective boxes. The user can then modify it.</p>
                        <div className="center">
                            <ul>
                                <li>Housing Limit: {budget.housing_lmt}</li>
                                <li>Utility Limit: {budget.utility_lmt}</li>
                                <li>Transportation Limit: {budget.transportation_lmt}</li>
                                <li>Grocery Limit: {budget.grocery_lmt}</li>
                                <li>Healthcare Limit: {budget.healthcare_lmt}</li>
                                <li>Dining Limit: {budget.dining_lmt}</li>
                                <li>Personal Care Limit: {budget.personal_care_lmt}</li>
                                <li>Entertainment Limit: {budget.entertainment_lmt}</li>
                            </ul>
                        </div>
                    </div>
                    


                ) : (
                    <div>No budget available</div>
                )

            }
        </div>

    )
}


export default Budget;