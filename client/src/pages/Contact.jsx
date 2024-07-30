import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap'; 
//import Footer from '../components/Footer'; 
import './Contact.css'; // Import custom CSS for additional styling

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
        <Container className="contact-container mt-5">
            <Row>
                <Col md={6} className="mb-4">
                    {/* Form with feedback messages */}
                    <div className="contact-form bg-light p-4 rounded shadow-sm">
                        <h1 className="mb-4">Contact Us</h1>
                        <Form onSubmit={handleSubmit}>
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                               />
                           </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicMessage" className="mt-3">
                                <Form.Label>Message</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Your message" 
                                    value={message}
                                    OnChange={(e) => setMessage(e.target.value)} 
                                />
                           </Form.Group>
                            <Button variant="primary" type="submit" className="custom-button mt-3">
                                Send
                           </Button>
                      </Form>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="contact-info bg-light p-4 rounded shadow-sm">
                        <h2>Contact Information</h2>
                        <p><strong>Address:</strong> Aymen Building, AddisAbeba</p>
                        <p><strong>Phone:</strong> +251911111111</p>
                        <p><strong>Email:</strong> everlink@example.com</p>
                    </div>
                </Col>
            </Row>
        </Container>
       
    );
}

export default Contact;
