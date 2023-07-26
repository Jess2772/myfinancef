import Navigation from "../components/Navigation";
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Transactions() {
    const [merchant, setMerchant] = useState()
    const [amount, setAmount] = useState()
    const [category, setCategory] = useState()
    const [paymentType, setPaymentType] = useState()
    const [date, setDate] = useState()
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
    }


    return (
        <div>
            <Navigation></Navigation>
            <div>
                <h2 className="center mt-3">Record a transaction</h2>
                <div className="center mt-3">
                    <Form onSubmit={e => submitTransaction(e)}>
    
                        <Form.Group className="mb-3 col-md-12" as={Col} controlId="formBasicMerchant">
                            <Form.Label>Merchant</Form.Label>
                            <Form.Control type="text" placeholder="Merchant" value={merchant} onChange={e => { setMerchant(e.target.value)}}/>
                        </Form.Group>

                        <Form.Label>Amount</Form.Label>
                        <Form.Group className="mb-3" as={Col} controlId="formBasicAmount">
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control type="number" step="0.01" placeholder="0.00" value={amount} onChange={e => {setAmount(e.target.value)}}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Label>Category</Form.Label>
                        <Form.Group className="mb-3" as={Col} controlId="formBasicCategory">
                            <Form.Select custom value={category} onChange={e => {setCategory(e.target.value)}}>
                                <option value="" selected disabled>Please select</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Housing">Housing</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Utility">Utility</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Dining">Dining</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Personal Care">Personal Care</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Miscellaneous">Miscellaneous</option>
                                
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Label>Payment Method</Form.Label>
                        <Form.Group className="mb-3" as={Col} controlId="formBasicPayment">
                            <Form.Select custom value={paymentType} onChange={e => {setPaymentType(e.target.value)}}>
                                <option value="" selected disabled>Please select</option>
                                <option value="CC">Credit Card</option>
                                <option value="DC">Debit Card</option>
                                <option value="CH">Cash</option>
                            </Form.Select>
                        </Form.Group>    

                        <Form.Group className="mb-3" as={Col} controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder={date} onChange={e => {setDate(e.target.value)}}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Transactions;