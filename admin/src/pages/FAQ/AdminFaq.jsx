import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Accordion, Button, Alert, Modal, Table } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb'; 
import axios from 'axios';
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

const CATEGORIES = [
    'General',
    'Payment',
    'Prizes',
    'Technical Support',
    'Others'
];

const AdminFaq = () => {
    const [faqs, setFaqs] = useState([]);
    const [submittedQuestions, setSubmittedQuestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [editIndex, setEditIndex] = useState(null);
    const [modalTitle, setModalTitle] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [response, setResponse] = useState('');

    useEffect(() => {
        fetchFAQs();
        fetchSubmittedQuestions();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await axios.get('/api/v1/faq');
            const mergedFAQs = [...FAQ_DATA, ...response.data];
            setFaqs(mergedFAQs);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
            setFeedbackMessage('Error fetching FAQs.');
        }
    };
    
    const fetchSubmittedQuestions = async () => {
        try {
            const response = await axios.get('/api/v1/submitted-questions');
            setSubmittedQuestions(response.data);
        } catch (error) {
            console.error('Error fetching submitted questions:', error);
            setFeedbackMessage('Error fetching submitted questions.');
        }
    };
    

    const handleAddQuestion = () => {
        setModalTitle('Add New FAQ');
        setNewQuestion('');
        setNewAnswer('');
        setSelectedCategory('General');
        setEditIndex(null);
        setShowModal(true);
    };

    const handleEditQuestion = (faqIndex, questionIndex) => {
        const faq = faqs[faqIndex];
        const question = faq.questions[questionIndex];
        setModalTitle('Edit FAQ');
        setNewQuestion(question.question);
        setNewAnswer(question.answer);
        setSelectedCategory(faq.category);
        setEditIndex({ faqIndex, questionIndex });
        setShowModal(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const method = editIndex ? 'PUT' : 'POST';
        const url = editIndex
            ? `/api/v1/admin/faq/${faqs[editIndex.faqIndex]._id}/questions/${faqs[editIndex.faqIndex].questions[editIndex.questionIndex]._id}`
            : '/api/v1/admin/faq';
        
        try {
            await axios({
                method,
                url,
                headers: { 'Content-Type': 'application/json' },
                data: { question: newQuestion, answer: newAnswer, category: selectedCategory }
            });
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
            await axios.delete(`/api/v1/admin/faq/${faqId}/questions/${questionId}`);
            fetchFAQs(); // Refresh FAQs after deletion
            setFeedbackMessage('FAQ deleted successfully.');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            setFeedbackMessage('Error deleting FAQ.');
        }
    };

    const handleRespond = async (questionId) => {
        try {
            await axios.put(`/api/v1/submitted-questions/${questionId}`, { response });
            fetchSubmittedQuestions(); // Refresh the submitted questions list
            setResponse('');
            setCurrentQuestionId(null);
            setFeedbackMessage('Response submitted successfully.');
        } catch (error) {
            console.error('Error submitting response:', error);
            setFeedbackMessage('Error submitting response.');
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

                        <h2 className="mt-5 mb-4 text-center">Submitted Questions</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Question</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedQuestions.length > 0 ? (
                                    submittedQuestions.map((item) => (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.question}</td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    onClick={() => {
                                                        setCurrentQuestionId(item._id);
                                                        setResponse('');
                                                    }}
                                                >
                                                    Respond
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No submitted questions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
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

            <Modal show={currentQuestionId !== null} onHide={() => setCurrentQuestionId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Respond to Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        if (currentQuestionId) {
                            handleRespond(currentQuestionId);
                        }
                    }}>
                        <Form.Group controlId="response">
                            <Form.Label>Response</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your response"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Submit Response
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminFaq;
