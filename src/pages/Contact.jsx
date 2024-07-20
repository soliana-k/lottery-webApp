import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button, Container, Form, Row, Col } from 'react-bootstrap'; 

const Contact = () => {
    return (
        <Container className="mt-5">
            <h1 className="mb-4">Contact Us</h1>
            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail" className="mt-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicMessage" className="mt-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Your message" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Send
                        </Button>
                    </Form>
                </Col>
                <Col md={6}>
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p><strong>Address:</strong> Ayemen Building, Mexico, AddisAbeba</p>
                        <p><strong>Phone:</strong> 0911111111</p>
                        <p><strong>Email:</strong> info@example.com</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
