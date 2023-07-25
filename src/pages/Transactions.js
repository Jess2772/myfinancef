import Navigation from "../components/Navigation";
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
function Transactions() {
    const submitTransaction = async e => {
        const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
        e.preventDefault();
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
                            <Form.Control type="text" placeholder="Merchant"/>
                        </Form.Group>

                        <Form.Label>Amount</Form.Label>
                        <Form.Group className="mb-3" as={Col} controlId="formBasicAmount">
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control type="number" step="0.01" placeholder="0.00"/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Label>Category </Form.Label>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Select custom>
                                <option value="" selected disabled>Please select</option>
                                <option value="Grocery">Grocery</option>
                                <option value="Housing">Housing</option>
                                <option value="Entertainment">Entertainment</option>
                            </Form.Select>
                        </Form.Group>  
                        
                        <Form.Label>Payment Method </Form.Label>
                        <Form.Group className="mb-3" as={Col}>
                            <Form.Select custom>
                                <option value="" selected disabled>Please select</option>
                                <option value="Credit">Credit Card</option>
                                <option value="Debit">Debit Card</option>
                                <option value="Cash">Cash</option>
                            </Form.Select>
                        </Form.Group>    

                        <Form.Group className="mb-3" as={Col} controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"/>
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