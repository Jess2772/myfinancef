// imports
import Navigation from "../components/Navigation";
// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, InputGroup} from 'react-bootstrap'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
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
            budget: parseFloat(housing_lmt) + parseFloat(utility_lmt) + parseFloat(transportation_lmt) + 
                    parseFloat(grocery_lmt) + parseFloat(healthcare_lmt) + parseFloat(dining_lmt) + 
                    parseFloat(personal_care_lmt) + parseFloat(entertainment_lmt) + parseFloat(clothing_lmt) +
                    parseFloat(miscellaneous_lmt),
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
        window.location.reload();
    }
    
    return (
        <div>
            <Navigation></Navigation>
            {
                activeBudget ? (
                    <div>
                        <h2 className="center mt-3">Budget: ${userBudget.budget} ({userBudget.frequency})</h2>
                        <p className="center mt-3">To update your budget, please re-enter all category limits and press submit</p>
                        <div style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3">
                            <Form onSubmit={e => submitBudget(e)}>
                                <FormGroup className="mb-3" controlId="formBasicHousingLimit">
                                    <FormControl value={housing_lmt} onChange={e => setHousingLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.housing_lmt} variant="outlined" type="number" label="Housing Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicUtilityLimit">
                                    <FormControl value={utility_lmt} onChange={e => setUtilityLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.utility_lmt} variant="outlined" type="number" label="Utility Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

            
                                <FormGroup className="mb-3" controlId="formBasicTransportationLimit">
                                    <FormControl value={transportation_lmt} onChange={e => setTransportationLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.transportation_lmt} variant="outlined" type="number" label="Transportation Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}}/>
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicGroceryLimit">
                                    <FormControl value={grocery_lmt} onChange={e => setGroceryLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.grocery_lmt} variant="outlined" type="number" label="Grocery Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicHealthcareLimit">
                                    <FormControl value={healthcare_lmt} onChange={e => setHealthcareLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.healthcare_lmt} variant="outlined" type="number" label="Healthcare Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicDiningLimit">
                                    <FormControl value={dining_lmt} onChange={e => setDiningLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.dining_lmt} variant="outlined" type="number" label="Dining Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicPersonalCareLimit">
                                    <FormControl value={personal_care_lmt} onChange={e => setPersonalcareLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.personal_care_lmt} variant="outlined" type="number" label="Personal Care Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicEntertainmentLimit">
                                    <FormControl value={entertainment_lmt} onChange={e => setEntertainmentLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.entertainment_lmt} variant="outlined" type="number" label="Entertainment Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicClothingLimit">
                                    <FormControl value={clothing_lmt} onChange={e => setClothingLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.clothing_lmt} variant="outlined" type="number" label="Clothing Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>

                                <FormGroup className="mb-3" controlId="formBasicMiscellaneousLimit" fullwidth>
                                    <FormControl value={miscellaneous_lmt} onChange={e => setMiscellaneousLimit(e.target.value)} >
                                        <TextField placeholder={userBudget.miscellaneous_lmt} variant="outlined" type="number" label="Miscellaneous Limit" InputProps={{startAdornment: (
                                            <InputAdornment position="start">
                                            $
                                            </InputAdornment>
                                        ), inputProps: {
                                            min: 0, step: 0.01
                                        }}} />
                                    </FormControl>
                                </FormGroup>
                                
                                <Button variant="contained" className="center" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="center mt-3">You do not have an active budget!</h2>
                        <p className="center mt-3">To create your budget, please re-enter all category limits and press submit</p>
                        <div className="center mt-3">
                            <Form onSubmit={e => submitBudget(e)}>
                                <Row>
                                    <Form.Label>Housing Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicHousingLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={housing_lmt} onChange={e => { setHousingLimit(e.target.value)}}/>
                                    </InputGroup>

                                    <Form.Label>Utility Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicUtilityLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={utility_lmt} onChange={e => setUtilityLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Transportation Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicTransportationLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={transportation_lmt} onChange={e => setTransportationLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Grocery Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicGroceryLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={grocery_lmt} onChange={e => setGroceryLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Healthcare Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicHealthcareLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={healthcare_lmt} onChange={e => setHealthcareLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Dining Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicDiningLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={dining_lmt} onChange={e => setDiningLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Personal Care Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicPersonalCareLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={personal_care_lmt} onChange={e => setPersonalcareLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Entertainment Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicEntertainmentLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={entertainment_lmt} onChange={e => setEntertainmentLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label>Clothing Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicClothingLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={clothing_lmt} onChange={e => setClothingLimit(e.target.value)}/>
                                    </InputGroup>

                                    <Form.Label>Miscellaneous Limit</Form.Label>
                                    <InputGroup className="mb-3" as={Col} controlId="formBasicMiscellaneousLimit">
                                        <InputGroup.Text>$</InputGroup.Text>
                                        <Form.Control type="number" step="0.01" value={miscellaneous_lmt} onChange={e => setMiscellaneousLimit(e.target.value)}/>
                                    </InputGroup>
                                </Row>
                                
                                <Button variant="contained" className="center" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                )
            }
        </div>

    )
}


export default Budget;