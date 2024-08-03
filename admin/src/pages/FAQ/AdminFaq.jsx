import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Accordion, Button, Alert, Modal } from 'react-bootstrap';
import './FAQ.css'; // Use or modify this file for styling

// Static FAQ Data
const STATIC_FAQ_DATA = [
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

const AdminFaq = () => {
    const [faqs, setFaqs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    // Fetch FAQs from backend
    const fetchFAQs = async () => {
        try {
            const response = await fetch('/api/v1/faq');
            const data = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    useEffect(() => {
        fetchFAQs(); 
    }, []);

    const handleAddQuestion = () => {
        setModalTitle('Add New FAQ');
        setNewQuestion('');
        setNewAnswer('');
        setEditIndex(null);
        setShowModal(true);
    };

    const handleEditQuestion = (index) => {
        const faq = faqs[index];
        setModalTitle('Edit FAQ');
        setNewQuestion(faq.question);
        setNewAnswer(faq.answer);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDeleteQuestion = async (index) => {
        const faqId = faqs[index].id;
        try {
            await fetch(`/api/v1/admin/faq/${faqId}`, {
                method: 'DELETE',
            });
            fetchFAQs(); // Refresh FAQs after deletion
            setFeedbackMessage('FAQ deleted successfully.');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            setFeedbackMessage('Error deleting FAQ.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = editIndex !== null ? 'PUT' : 'POST';
        const url = editIndex !== null ? `/api/v1/admin/faq/${faqs[editIndex].id}` : '/api/v1/admin/faq';
        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
            });
            setShowModal(false);
            fetchFAQs(); // Refresh FAQs after submission
            setFeedbackMessage('FAQ saved successfully.');
        } catch (error) {
            console.error('Error saving FAQ:', error);
            setFeedbackMessage('Error saving FAQ.');
        }
    };

    // Combine static and dynamic FAQs
    const combinedFAQs = [...STATIC_FAQ_DATA, ...faqs];

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4 text-center">Admin FAQ Management</h1>

                        {/* Feedback Message */}
                        {feedbackMessage && (
                            <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
                                {feedbackMessage}
                            </Alert>
                        )}

                        {/* Add FAQ Button */}
                        <Button variant="primary" onClick={handleAddQuestion} className="mb-4">
                            Add New FAQ
                        </Button>

                        {/* FAQ Accordion */}
                        <Accordion className="faq-accordion">
                            {combinedFAQs.length > 0 ? (
                                combinedFAQs.map((category, catIndex) => (
                                    <Accordion.Item eventKey={catIndex.toString()} key={catIndex}>
                                        <Accordion.Header className="accordion-header">
                                            {category.category}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {category.questions.length > 0 ? (
                                                category.questions.map((item, index) => (
                                                    <div key={index} className="faq-item mb-3">
                                                        <h5>{item.question}</h5>
                                                        <p>{item.answer}</p>
                                                        {/* Edit and Delete buttons (if applicable) */}
                                                        {faqs.find(faq => faq.question === item.question) && (
                                                            <div>
                                                                <Button variant="warning" onClick={() => handleEditQuestion(faqs.findIndex(faq => faq.question === item.question))} className="me-2">
                                                                    Edit
                                                                </Button>
                                                                <Button variant="danger" onClick={() => handleDeleteQuestion(faqs.findIndex(faq => faq.question === item.question))}>
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No questions found.</p>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            ) : (
                                <p>No FAQs found.</p>
                            )}
                        </Accordion>
                    </Col>
                </Row>
            </Container>

            {/* Modal for Adding/Editing FAQ */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="faqQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the question"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="faqAnswer" className="mt-3">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter the answer"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminFaq;
