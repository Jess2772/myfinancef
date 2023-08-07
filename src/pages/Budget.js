import Navigation from "../components/Navigation";
import {useEffect, useState} from "react";
import client from '../apis/Client'
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from "@mui/material/Fade";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Budget() {
    const [userBudget, setUserBudget] = useState('');
    const [activeBudget, setActiveBudget] = useState(true);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [budget, setBudget]= useState();
    const [frequency, setFrequency]= useState();
    const [housing_lmt, setHousingLimit]= useState();
    const [utility_lmt, setUtilityLimit]= useState();
    const [transportation_lmt, setTransportationLimit]= useState();
    const [grocery_lmt, setGroceryLimit]= useState();
    const [healthcare_lmt, setHealthcareLimit]= useState();
    const [dining_lmt, setDiningLimit]= useState();
    const [entertainment_lmt, setEntertainmentLimit]= useState();
    const [clothing_lmt, setClothingLimit]= useState();
    const [miscellaneous_lmt, setMiscellaneousLimit]= useState();

    const [alertVisibility, setAlertVisibility] = useState(false)
    const [alertType, setAlertType] = useState('success')
    const [alertDesc, setAlertDesc] = useState('Successfully recorded your budget!')

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
                    setLoading(false)
                }).catch((err)=> {
                    console.log(err)
                })

            })
        ()};     
    }, []);

    const submitBudget = async e => {
        e.preventDefault();
        const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
        return await client.post(
          "/api/create/budget",
          {
            user_id: user_id,
            budget: parseFloat(housing_lmt) + parseFloat(utility_lmt) + parseFloat(transportation_lmt) + 
                    parseFloat(grocery_lmt) + parseFloat(healthcare_lmt) + parseFloat(dining_lmt) + 
                    parseFloat(entertainment_lmt) + parseFloat(clothing_lmt) + parseFloat(miscellaneous_lmt),
            frequency: "Monthly",
            housing_lmt: housing_lmt,
            utility_lmt: utility_lmt,
            transportation_lmt: transportation_lmt,
            grocery_lmt: grocery_lmt,
            healthcare_lmt: healthcare_lmt,
            dining_lmt: dining_lmt,
            entertainment_lmt: entertainment_lmt,
            clothing_lmt: clothing_lmt,
            miscellaneous_lmt: miscellaneous_lmt
          },
          { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
          }, withCredentials: true, crossDomain: true}
        ).then((res) => {
            setAlertVisibility(true)
            if (res.request.status === 500) {
                setAlertType('error')
                setAlertDesc('There was an error recording your budget')
            } else {
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
            }
        })
    }


    if (loading) {
        return (
            <div>
                <Navigation></Navigation>
                <Box sx={{display: 'flex', margin: 40, justifyContent:'center', alignItems:'center' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
    
    return (
        <div>
            <Navigation></Navigation>
            {
              
                    <div>
                        <h2 className="center mt-3">Budget: ${userBudget.budget} ({userBudget.frequency})</h2>
                        <p className="center mt-3">To update your budget, please re-enter all category limits and press submit</p>
                        <div style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3">
                            <Form onSubmit={e => submitBudget(e)}>
                                <FormGroup className="mb-3" controlId="formBasicHousingLimit">
                                    <FormControl value={housing_lmt} onChange={e => setHousingLimit(e.target.value)} >
                                        <TextField sx={{ width: 350 }} placeholder={userBudget.housing_lmt} variant="outlined" type="number" label="Housing Limit" InputProps={{startAdornment: (
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
                        <Stack sx={{ width: '100%' }} className="center" direction="col" width="100%" textAlign="center">
                            <Fade
                                in={alertVisibility} //Write the needed condition here to make it appear
                                timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                                addEndListener={() => {
                                    setTimeout(() => {
                                    setAlertVisibility(false)
                                    }, 2000);
                                }}
                                >
                                <Alert variant="outlined" severity={alertType}>
                                    {alertDesc}
                                </Alert>
                            </Fade>
                        </Stack>
                    </div>
            }
        </div>
    )
}
export default Budget;