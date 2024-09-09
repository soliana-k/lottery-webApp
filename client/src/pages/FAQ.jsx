import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Accordion, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer'; 
import './faqq.css';
import axios from 'axios';
// Static FAQ Data
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
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State for search input visibility
    const [editIndex, setEditIndex] = useState(null); // Initialize as null or the index of the FAQ you want to edit

    // Effect to handle clicks outside the search input container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.search-input-container') === null) {
                setIsSearchVisible(false); // Hide search input if clicking outside
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Fetch FAQs from backend
    const fetchFAQs = async (searchTerm = '') => {
        try {
            const response = await fetch(`/api/v1/faq/questions?searchTerm=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };
    
    useEffect(() => {
        fetchFAQs(searchTerm); // Fetch FAQs when searchTerm changes
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true); // Show search input when the icon is clicked
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchFAQs(searchTerm); // Fetch FAQs on submit
        setIsSearchVisible(false); // Optionally hide search input after submitting
    };

    const handleSubmitQuestion = async (event) => {
        event.preventDefault();
        const method = editIndex !== null ? 'PUT' : 'POST';
        const url = editIndex !== null 
            ? `/api/v1/admin/faq/${faqs[editIndex]._id}/questions/${faqs[editIndex].questions[editIndex]._id}` 
            : '/api/v1/faq/submit';
    
        const body = {
            name: userName,
            email: userEmail,
            question: userQuestion,
        };
    
        try {
            const response = await axios({
                method,
                url,
                headers: { 'Content-Type': 'application/json' },
                data: body
            });
            if (response.data.success) {
                setFeedbackMessage('Your question has been submitted successfully!');
                setUserName('');
                setUserEmail('');
                setUserQuestion('');
                fetchFAQs(searchTerm); // Refresh FAQs after submission
            } else {
                setFeedbackMessage('There was a problem submitting your question. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setFeedbackMessage('An error occurred. Please try again.');
        }
    };
    
    
    
    
    
    const filterFAQData = () => {
        return FAQ_DATA.map(category => ({
            ...category,
            questions: category.questions.filter(q =>
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }));
    };
    
    // Combine static and dynamic FAQs
    const combinedFAQs = [...filterFAQData(), ...faqs];

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4 text-center">Frequently Asked Questions</h1>

                        {/* Search Functionality */}
                        <div className="col-12 d-flex align-items-center">
                            <div className="search-input-container mb-4">
                                <Form onSubmit={handleSearchSubmit} className="d-flex">
                                    {isSearchVisible && (
                                        <Form.Control
                                            type="text"
                                            placeholder="Search for a question..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="search-input"
                                        />
                                    )}
                                    <div className="search-icon-container">
                                        <i 
                                            className="fas fa-search search-icon"
                                            onClick={handleSearchClick}
                                        ></i>
                                   </div>
                              </Form>
                           </div>
                        </div>

                        {/* FAQ Accordion */}
                        <Accordion className="faq-accordion">
                            {combinedFAQs.length > 0 ? (
                                combinedFAQs.map((category, index) => (
                                    <Accordion.Item eventKey={index.toString()} key={index}>
                                        <Accordion.Header className="accordion-header">{category.category}</Accordion.Header>
                                        <Accordion.Body>
                                            {category.questions.length > 0 ? (
                                                category.questions.map((item, i) => (
                                                    <div key={i} className="faq-item mb-3">
                                                        <h5>{item.question}</h5>
                                                        <p>{item.answer || 'No answer available.'}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No questions found.</p>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            ) : (
                                <p>No questions found.</p>
                            )}
                        </Accordion>
                    </Col>
                </Row>
            </Container>

            {/* Question Submission Form Styled Like Accordion */}
            <Container className="submit-question-container mt-5">
                <div className="accordion-item fixed-form">
                    <h2 className="accordion-header">Submit Your Question</h2>
                    <div className="accordion-body">
                        <p>If you have any questions that are not covered in our FAQ, please feel free to ask them here. We are always happy to help!</p>
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
                            <Button variant="custom" type="submit" className="btn-custom mt-3">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </Container>

            <Footer /> {/* Ensure the footer is included */}
        </div>
    );
};

export default FAQ;
