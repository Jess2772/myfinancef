import Navigation from "../components/Navigation";
import { Row, Col, Form, Button } from 'react-bootstrap'
function Spendings() {
    return (
        <div>
            <Navigation></Navigation>
            <Form.Group>
                <Row>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Label>Select Color : </Form.Label>
                    <Form.Control as="select" custom>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="orange">Orange</option>
                    </Form.Control>
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Label>Select Color : </Form.Label>
                    <Form.Control as="select" custom>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="orange">Orange</option>
                    </Form.Control>
                </Col>
                </Row>
            </Form.Group>
        </div>
    )
}

export default Spendings;