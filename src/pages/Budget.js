// imports
import Navigation from "../components/Navigation";
// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, InputGroup} from 'react-bootstrap'
function Budget() {
    const [userBudget, setUserBudget] = useState('');
    const [activeBudget, setActiveBudget] = useState(true);
    const navigate = useNavigate();

    const [budget, setBudget]= useState();
    const [frequency, setFrequency]= useState();
    const [housing_lmt, setHousingLimit]= useState();
    const [utility_lmt, setUtilityLimit]= useState();
    const [transportation_lmt, setTransportationLimit]= useState();
    const [grocery_lmt, setGroceryLimit]= useState();
    const [healthcare_lmt, setHealthcareLimit]= useState();
    const [dining_lmt, setDiningLimit]= useState();
    const [personal_care_lmt, setPersonalcareLimit]= useState();
    const [entertainment_lmt, setEntertainmentLimit]= useState();
    const [clothing_lmt, setClothingLimit]= useState();
    const [miscellaneous_lmt, setMiscellaneousLimit]= useState();


    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {         
            (async () => { 
                console.log(localStorage.getItem('access_token'))
                const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                return await client.post(
                    'api/user/budget',
                    {
                        user_id: user_id
                    }, 
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }}, { withCredentials: true, crossDomain: true }   
                ).then((res) => {
                    if (res.request.status === 404) {
                        setActiveBudget(false)
                    } else {
                        setUserBudget(res.data)
                    }
                }).catch((err)=> {
                    console.log(err)
                })

            })
        ()};     
    }, []);

    const submitBudget = async e => {
        e.preventDefault();
        const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
        const {data} = await client.post(
          "/api/create/budget",
          {
            user_id: user_id,
            budget: 200,
            frequency: "Monthly",
            housing_lmt: housing_lmt,
            utility_lmt: utility_lmt,
            transportation_lmt: transportation_lmt,
            grocery_lmt: grocery_lmt,
            healthcare_lmt: healthcare_lmt,
            dining_lmt: dining_lmt,
            personal_care_lmt: personal_care_lmt,
            entertainment_lmt: entertainment_lmt,
            clothing_lmt: clothing_lmt,
            miscellaneous_lmt: miscellaneous_lmt
          },
          { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
          }, withCredentials: true, crossDomain: true}
        )
        
        // localStorage.clear();     // DO I NEED TO KEEP THIS?     
        // localStorage.setItem('access_token', data.access);         
        // localStorage.setItem('refresh_token', data.refresh);         
        // client.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        //window.location.href = '/'       
        navigate('/budget')
    }
    
    return (
        <div>
            <Navigation></Navigation>
            {
                activeBudget ? (
                    <div>
                        <p className="center mt-3">Budget: {userBudget.budget} ({userBudget.frequency})</p>
                        <div className="center">
                            <Form onSubmit={e => submitBudget(e)}>
                                <Row>
                                    <Form.Label>Housing Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicHousingLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.housing_lmt} value={housing_lmt} onChange={e => { setHousingLimit(e.target.value)}}/>
                                    </InputGroup>

                                    <Form.Label>Utility Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicUtilityLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.utility_lmt} value={utility_lmt} onChange={e => setUtilityLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Transportation Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicTransportationLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.transportation_lmt} value={transportation_lmt} onChange={e => setTransportationLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Grocery Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicGroceryLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.grocery_lmt} value={grocery_lmt} onChange={e => setGroceryLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Healthcare Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicHealthcareLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.healthcare_lmt} value={healthcare_lmt} onChange={e => setHealthcareLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Dining Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicDiningLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.dining_lmt} value={dining_lmt} onChange={e => setDiningLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Personal Care Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicPersonalCareLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.personal_care_lmt} value={personal_care_lmt} onChange={e => setPersonalcareLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Entertainment Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicEntertainmentLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.entertainment_lmt} value={entertainment_lmt} onChange={e => setEntertainmentLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Clothing Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicClothingLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.clothing_lmt} value={clothing_lmt} onChange={e => setClothingLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Miscellaneous Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicMiscellaneousLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" placeholder={userBudget.miscellaneous_lmt} value={miscellaneous_lmt} onChange={e => setMiscellaneousLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                            </Form>
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