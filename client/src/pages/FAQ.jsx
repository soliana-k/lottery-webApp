import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Accordion, Button, Alert } from 'react-bootstrap';
import Footer from '../components/Footer'; 
import './faqq.css';
import axios from 'axios';

const FAQ = () => { 
    const [searchTerm, setSearchTerm] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [groupedFaqs, setGroupedFaqs] = useState({});

    useEffect(() => {
        fetchFAQs(); // Fetch FAQs on component mount
    }, []); // Runs once on mount

    const fetchFAQs = async (searchTerm = '') => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/faq/questions?searchTerm=${encodeURIComponent(searchTerm)}`);
            setFaqs(response.data);
            groupFAQs(response.data); // Group FAQs after fetching
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };
    
    const groupFAQs = (faqs) => {
        const grouped = faqs.reduce((acc, faq) => {
            const { category } = faq;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(faq);
            return acc;
        }, {});
        setGroupedFaqs(grouped);
    };

    useEffect(() => {
        fetchFAQs(searchTerm); // Fetch FAQs when searchTerm changes
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setIsSearchVisible(true);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchFAQs(searchTerm);
        setIsSearchVisible(false);
    };

    const handleSubmitQuestion = async (event) => {
        event.preventDefault();
    
        const body = {
            name: userName,
            email: userEmail,
            question: userQuestion,
            status: 'pending', // Question is marked as pending for admin approval
        };
    
        try {
            const response = await axios.post('http://localhost:8000/api/v1/faq/submit', body);
            if (response.data.success) {
                setFeedbackMessage('Your question has been submitted successfully!');
                setUserName('');
                setUserEmail('');
                setUserQuestion('');
                fetchFAQs(); // Refresh FAQs after submitting
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

                        {/* FAQ Accordion Grouped by Category */}
                        <Accordion className="faq-accordion">
                            {Object.keys(groupedFaqs).length > 0 ? (
                                Object.keys(groupedFaqs).map((category) => (
                                    <div key={category}>
                                        <Accordion.Item eventKey={category}>
                                            <Accordion.Header className="accordion-header">{category}</Accordion.Header>
                                            <Accordion.Body>
                                                {groupedFaqs[category].map((item, index) => (
                                                    <div key={item._id}>
                                                        <strong>{item.question}</strong>
                                                        <p>{item.answer || 'No answer available.'}</p>
                                                    </div>
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
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
