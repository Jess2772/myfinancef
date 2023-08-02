import Navigation from "../components/Navigation";
import { Form } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Fade from "@mui/material/Fade";
function Transactions() {
    const [merchant, setMerchant] = useState()
    const [amount, setAmount] = useState()
    const [category, setCategory] = useState()
    const [paymentType, setPaymentType] = useState()
    const [date, setDate] = useState();
    const [alertVisibility, setAlertVisibility] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } 
    }, []);

    const submitTransaction = async e => {
        const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
        e.preventDefault();
        const {data} = await client.post(
            "/api/user/transaction",
            {   
                user_id: user_id,
                merchant: merchant,
                amount: amount,
                category: category,
                pymt_method: paymentType,
                transaction_date: moment(date).format('YYYY-MM-DD')

            }, 
            { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, withCredentials: true, crossDomain: true}
        ).then(
            setAlertVisibility(true)
        )

        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    }

    const categories = ['Grocery', 'Entertainment', 'Utility', 'Dining', 'Healthcare', 'Clothing', 'Miscellaneous', 'Housing', 'Transportation']

    return (
        <div>
            <Navigation></Navigation>
            <div>
                <h2 className="center mt-3">Record a transaction</h2>
                <div style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3">
                    <Form onSubmit={e => submitTransaction(e)}>
                        <FormGroup className="mb-3" controlId="formBasicMerchant">
                            <FormControl placeholder="Merchant" value={merchant} onChange={e => setMerchant(e.target.value)}>
                                <TextField sx={{ width: 350 }} variant="filled" label="Merchant" />
                            </FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formBasicAmount">
                            <FormControl value={amount} onChange={e => setAmount(e.target.value)} >
                                <TextField variant="filled" type="number" label="Amount" InputProps={{startAdornment: (
                                    <InputAdornment position="start">
                                    $
                                    </InputAdornment>
                                ), inputProps: {
                                    min: 0, step: 0.01
                                } }}/>
                            </FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formBasicCategory">                                                  
                        <Autocomplete
                            onChange={(event, value) => setCategory(value)}
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            
                            renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                        </FormGroup>     
                        <FormGroup className="mb-3" controlId="formBasicPayment">
                            <FormControl >
                                <InputLabel>Payment Method</InputLabel>
                                <Select
                                    defaultValue=""
                                    value={paymentType}
                                    label="PaymentMethod"
                                    onChange={e => {setPaymentType(e.target.value)}}>
                                    <MenuItem value="CC">Credit Card</MenuItem>
                                    <MenuItem value="DC">Debit Card</MenuItem>
                                    <MenuItem value="CH">Cash</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formBasicDate">
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                                <FormControl value={date} onChange={e => setDate(e.target.value)} >
                                    {/* <TextField type="date" label="Date" placeholder=""/> */}
                                    {/* <DateField format="YYYY-MM-DD" label="Date Picker" */}
                                    <DatePicker
                                            format="yyyy-MM-dd"
                                            label="Date"
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField placeholder="" {...params} />}
                                    />
                                </FormControl>
                            </LocalizationProvider>
                        </FormGroup>

                        <Fab color="primary" aria-label="add" type="submit">
                            <AddIcon />
                        </Fab>
                    </Form>
                    
                </div>
                <Stack sx={{ width: '100%' }} className="center" direction="row" width="100%" textAlign="center">
                    <Fade
                        in={alertVisibility} //Write the needed condition here to make it appear
                        timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
                        addEndListener={() => {
                            setTimeout(() => {
                            setAlertVisibility(false)
                            }, 2000);
                        }}
                        >
                            <Alert variant="outlined" severity="success">
                                This is a success alert — check it out!
                            </Alert>
                    </Fade>
                {/* <Alert variant="outlined" severity="success">
                    This is a success alert — check it out!
                </Alert> */}
                </Stack>

            </div>
        </div>
    )
}

export default Transactions;