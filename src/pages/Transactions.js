import Navigation from "../components/Navigation";
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import Button from '@mui/material/Button';
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs, { Dayjs } from 'dayjs';
function Transactions() {
    const [merchant, setMerchant] = useState()
    const [amount, setAmount] = useState()
    const [category, setCategory] = useState()
    const [paymentType, setPaymentType] = useState()
    const [date, setDate] = useState();
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
                transaction_date: date

            }, 
            { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, withCredentials: true, crossDomain: true}
        )
        // window.location.reload();
    }


    return (
        <div>
            <Navigation></Navigation>
            <div>
                <h2 className="center mt-3">Record a transaction</h2>
                <div className="center mt-3">
                    <Form onSubmit={e => submitTransaction(e)}>
                        <FormGroup className="mb-3" controlId="formBasicMerchant">
                            <FormControl placeholder="Merchant" value={merchant} onChange={e => setMerchant(e.target.value)}>
                                <TextField variant="standard" label="Merchant" />
                            </FormControl>
                        </FormGroup>

                        <FormGroup className="mb-3" controlId="formBasicAmount">
                            <FormControl value={amount} onChange={e => setAmount(e.target.value)} >
                                <TextField variant="standard" type="number" label="Amount" inputProps={{ step: "0.01" }}/>
                            </FormControl>
                        </FormGroup>
                        
                        <FormGroup className="mb-3" controlId="formBasicCategory">
                            <FormControl>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    label="Category"
                                    onChange={e => {setCategory(e.target.value)}}>
                                    <MenuItem value="Grocery">Grocery</MenuItem>
                                    <MenuItem value="Housing">Housing</MenuItem>
                                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                                    <MenuItem value="Utility">Utility</MenuItem>
                                    <MenuItem value="Dining">Dining</MenuItem>
                                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                                    <MenuItem value="Personal Care">Personal Care</MenuItem>
                                    <MenuItem value="Clothing">Clothing</MenuItem>
                                    <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                </Select>
                            </FormControl>
                        </FormGroup>
                              
                        <FormGroup className="mb-3" controlId="formBasicPayment">
                            <FormControl >
                                <InputLabel>Payment Method</InputLabel>
                                <Select
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
                                    <TextField type="date" />
                                </FormControl>
                                {/* <DateField format="YYYY-MM-DD" label="Date Picker" value={date} onChange={e => setDate(e.target.value)}/> */}
                            </LocalizationProvider>
                        </FormGroup>

                        <Button variant="contained" className="center" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Transactions;