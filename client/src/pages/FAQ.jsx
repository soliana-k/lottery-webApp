import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Card, Collapse, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer'; 
import './FAQ.css'; 

const FAQ_DATA = [
    {
        category: 'General',
        questions: [
            { question: 'What is the lottery?', answer: 'The lottery is a game of chance where participants can win prizes based on random selection.' },
            { question: 'How do I participate?', answer: 'You can participate by purchasing a ticket through our website or authorized retailers.' }
        ]
    },
    {
        category: 'Payment',
        questions: [
            { question: 'What payment methods are accepted?', answer: 'We accept various payment methods including credit cards, debit cards, and online payment services.' },
            { question: 'Is my payment information secure?', answer: 'Yes, we use secure payment gateways to protect your information.' }
        ]
    },
    {
        category: 'Prizes',
        questions: [
            { question: 'How are prizes determined?', answer: 'Prizes are determined by the lottery draw results and the number of tickets sold.' },
            { question: 'Can I claim my prize anonymously?', answer: 'It depends on local regulations. Check the rules for your region.' }
        ]
    },
    {
        category: 'Technical Support',
        questions: [
            { question: 'I am having trouble accessing the website. What should I do?', answer: 'Please check your internet connection and try again. If the problem persists, contact our support team.' },
            { question: 'How do I reset my password?', answer: 'Use the "Forgot Password" link on the login page to reset your password.' }
        ]
    }
];

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openCategory, setOpenCategory] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredFAQs = FAQ_DATA.map(category => ({
        ...category,
        questions: category.questions.filter(q =>
            q.question.toLowerCase().includes(searchTerm) ||
            q.answer.toLowerCase().includes(searchTerm)
        )
    }));

    const handleCategoryToggle = (index) => {
        setOpenCategory(openCategory === index ? null : index);
    };

    const handleSubmitQuestion = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/v1/faq/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: userName, email: userEmail, question: userQuestion })
            });

            const data = await response.json();
            if (data.success) {
                setFeedbackMessage('Your question has been submitted successfully!');
                setUserName('');
                setUserEmail('');
                setUserQuestion('');
            } else {
                setFeedbackMessage('There was a problem submitting your question. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFeedbackMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4 text-center">Frequently Asked Questions</h1>

                        {/* Search Functionality */}
                        <Form className="mb-4">
                            <Form.Group controlId="search">
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a question..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                            </Form.Group>
                        </Form>

                        {/* FAQ Categories */}
                        {filteredFAQs.map((category, index) => (
                            <div key={index} className="mb-4">
                                <h3 onClick={() => handleCategoryToggle(index)}
                                    className="category-title"
                                    aria-controls={`category-${index}`}
                                    aria-expanded={openCategory === index}
                                >
                                    {category.category}
                                </h3>
                                <Collapse in={openCategory === index}>
                                    <div id={`category-${index}`}>
                                        {category.questions.length > 0 ? (
                                            category.questions.map((item, i) => (
                                                <Card key={i} className="mb-2">
                                                    <Card.Body>
                                                        <Card.Title>{item.question}</Card.Title>
                                                        <Card.Text>{item.answer}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            ))
                                        ) : (
                                            <p>No questions found.</p>
                                        )}
                                    </div>
                                </Collapse>
                            </div>
                        ))}

                        {/* Question Submission Form */}
                        <div className="form-section">
                            <h2 className="mt-5">Submit Your Question</h2>
                            {feedbackMessage && (
                                <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
                                    {feedbackMessage}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmitQuestion}>
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
                                <Form.Group controlId="userEmail" className="mt-3">
                                    <Form.Label>Your Email (optional)</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="userQuestion" className="mt-3">
                                    <Form.Label>Your Question</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your question here..."
                                        value={userQuestion}
                                        onChange={(e) => setUserQuestion(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer /> {/* Ensure the footer is included */}
        </div>
    );
};

export default FAQ;
