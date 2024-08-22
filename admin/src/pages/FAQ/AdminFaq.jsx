import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Accordion, Button, Alert, Modal } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb'; // Ensure the correct path to Breadcrumbs component
import './FAQ.css';

// Static FAQ data
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

const AdminFaq = () => {
    const [faqs, setFaqs] = useState(FAQ_DATA); // Initialize with static data
    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await fetch('/api/v1/faq');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            setFeedbackMessage('Error fetching FAQs.');
        }
    };

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
        setNewQuestion(faq.questions[index].question); // Adjusted to access the correct question
        setNewAnswer(faq.questions[index].answer); // Adjusted to access the correct answer
        setEditIndex({ faqIndex: index, questionIndex: index });
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = editIndex ? 'PUT' : 'POST';
        const url = editIndex ? `/api/v1/admin/faq/${faqs[editIndex.faqIndex]._id}` : '/api/v1/admin/faq';
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: newQuestion, answer: newAnswer, category: 'General' })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            setShowModal(false);
            fetchFAQs(); // Refresh FAQs after submission
            setFeedbackMessage('FAQ saved successfully.');
        } catch (error) {
            console.error('Error saving FAQ:', error);
            setFeedbackMessage('Error saving FAQ.');
        }
    };

    const handleDeleteQuestion = async (faqIndex, questionIndex) => {
        const faqId = faqs[faqIndex]._id;
        const questionId = faqs[faqIndex].questions[questionIndex]._id;
        try {
            const response = await fetch(`/api/v1/admin/faq/${faqId}/questions/${questionId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            fetchFAQs(); // Refresh FAQs after deletion
            setFeedbackMessage('FAQ deleted successfully.');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            setFeedbackMessage('Error deleting FAQ.');
        }
    };

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/home" },
                        { label: "Content Management", href: "/content" },
                        { label: "FAQ Management", href: "/faq-management" },
                        
                    ]}
                />
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4 text-center">FAQ Management</h1>

                        {feedbackMessage && (
                            <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
                                {feedbackMessage}
                            </Alert>
                        )}

                        <Button variant="primary" onClick={handleAddQuestion} className="mb-4">
                            Add New FAQ
                        </Button>

                        <Accordion className="faq-accordion">
                            {faqs.length > 0 ? (
                                faqs.map((faq, faqIndex) => (
                                    <Accordion.Item eventKey={faqIndex.toString()} key={faqIndex}>
                                        <Accordion.Header className="accordion-header">
                                            {faq.category}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {faq.questions.length > 0 ? (
                                                faq.questions.map((item, questionIndex) => (
                                                    <div key={questionIndex} className="faq-item mb-3">
                                                        <h5>{item.question}</h5>
                                                        <p>{item.answer}</p>
                                                        <div>
                                                            <Button variant="warning" onClick={() => handleEditQuestion(faqIndex, questionIndex)} className="me-2">
                                                                Edit
                                                            </Button>
                                                            <Button variant="danger" onClick={() => handleDeleteQuestion(faqIndex, questionIndex)}>
                                                                Delete
                                                            </Button>
                                                        </div>
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
