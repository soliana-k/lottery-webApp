import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap'; 
import Footer from '../components/Footer'; 
import './Contact.css'; 

const Contact = () => {
    // State variables to manage form data and feedback messages
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Reset feedback messages
        setSuccess('');
        setError('');

        // Mock form submission (Replace this with actual submission logic)
        if (name && email && message) {
            // Simulate a successful submission
            setSuccess('Your message has been sent successfully!');
        } else {
            // Simulate an error
            setError('Please fill out all fields.');
        }

        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Row>
                    <Col md={6} className="mb-4">
                        {/* Contact Form Styled Like Accordion */}
                        <div className="contact-form-container">
                            <div className="accordion-item fixed-form">
                                <h2 className="accordion-header">Contact Us</h2>
                                <div className="accordion-body">
                                    {success && (
                                        <Alert variant="success">
                                            {success}
                                        </Alert>
                                    )}
                                    {error && (
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Enter your name" 
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} 
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail" className="mt-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                placeholder="Enter your email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} 
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicMessage" className="mt-3">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows={3} 
                                                placeholder="Your message" 
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)} 
                                                required
                                            />
                                        </Form.Group>
                                        <Button variant="custom" type="submit" className="btn-custom mt-3">
                                            Send
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} className="mb-4">
                        {/* Contact Information */}
                        <div className="contact-info bg-light p-4 rounded shadow-sm">
                            <h2>Contact Information</h2>
                            <p><strong>Address:</strong> Aymen Building, AddisAbeba</p>
                            <p><strong>Phone:</strong> +251911111111</p>
                            <p><strong>Email:</strong> everlink@example.com</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer /> {/* Ensure this spans the full width of the viewport */}
        </div>
    );
}

export default Contact;
