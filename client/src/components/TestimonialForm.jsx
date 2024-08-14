import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './Testimonial.css';

const TestimonialForm = () => {
    const [userName, setUserName] = useState('');
    const [userTestimonial, setUserTestimonial] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/v1/testimonial/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName, testimonial: userTestimonial })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            if (data.success) {
                setFeedbackMessage('Your testimonial has been submitted successfully!');
                setUserName('');
                setUserTestimonial('');
            } else {
                setFeedbackMessage('There was a problem submitting your testimonial. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFeedbackMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="testimonial-form-wrapper">
            <Container className="mt-5">
                <h1 className="mb-4 text-center">Submit Your Testimonial</h1>
                {feedbackMessage && (
                    <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
                        {feedbackMessage}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="userTestimonial" className="mt-3">
                        <Form.Label>Your Testimonial</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your testimonial here..."
                            value={userTestimonial}
                            onChange={(e) => setUserTestimonial(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 mb-5">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default TestimonialForm;
