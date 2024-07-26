import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import './FAQ.css'; // Import custom CSS for additional styling


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

    return (
        <Container className="mt-5">
            <Row>
                <Col md={12}>
                    <h1 className="mb-4">Frequently Asked Questions</h1>

                    {/* Search Functionality */}
                    <Form className="mb-4">
                        <Form.Group controlId="search">
                            <Form.Control
                                type="text"
                                placeholder="Search for a question..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Form>

                    {/* FAQ Categories */}
                    {filteredFAQs.map((category, index) => (
                        <div key={index} className="mb-4">
                            <h3>{category.category}</h3>
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
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default FAQ;
