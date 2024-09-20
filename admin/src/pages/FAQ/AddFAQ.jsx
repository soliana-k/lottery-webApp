import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../../breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';

const AddFAQ = ({ fetchFAQs }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // State for adding or editing FAQs or answering a submitted question
    const [newQuestion, setNewQuestion] = useState(location.state?.question || '');
    const [newAnswer, setNewAnswer] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [error, setError] = useState('');
    const [faqs, setFAQs] = useState([]);

    // Fetch existing FAQs when component mounts
    useEffect(() => {
        fetchExistingFAQs();

        // If editing an existing FAQ, populate the form with its data
        if (location.state?.existingFAQ) {
            const { question, answer, category } = location.state.existingFAQ;
            setNewQuestion(question);
            setNewAnswer(answer);
            setSelectedCategory(category);
        } else {
            resetForm();
        }
    }, [location.state]);

    // Function to fetch existing FAQs from the backend
    const fetchExistingFAQs = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/faq/questions');
            setFAQs(response.data);
        } catch (err) {
            setError('Error fetching existing FAQs.');
            toast.error('Error fetching existing FAQs.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!newQuestion || !newAnswer) {
            setError('Both question and answer are required.');
            return;
        }

        try {
            if (location.state?.existingFAQ) {
                // Update the existing FAQ
                await axios.put(`http://localhost:8000/api/v1/faq/questions/${location.state.existingFAQ._id}`, {
                    question: newQuestion,
                    answer: newAnswer,
                    category: selectedCategory,
                });
                toast.success('FAQ updated successfully!');
            } else {
                // Add a new FAQ (answer a submitted question)
                await axios.post('http://localhost:8000/api/v1/faq/questions', {
                    question: newQuestion,
                    answer: newAnswer,
                    category: selectedCategory,
                });
                toast.success('FAQ added successfully!');
            }

            fetchFAQs();
            navigate('/content/FAQ/ManageFAQs');

        } catch (error) {
            console.error('Error adding/updating FAQ:', error);
            const message = error.response?.data?.message || 'Failed to submit FAQ.';
            toast.error(message);
            setError(message);
        }
    };

    const resetForm = () => {
        setNewQuestion('');
        setNewAnswer('');
        setSelectedCategory('General');
        setError('');
    };

    const handleDelete = async (faqId) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/faq/questions/${faqId}`);
                fetchExistingFAQs();
                toast.success('FAQ deleted successfully!');
            } catch (err) {
                toast.error('Error deleting FAQ.');
            }
        }
    };

    return (
        <Container className="content-management-container my-5">
            <Breadcrumbs 
                items={[
                    { label: 'Home', href: '/home' },
                    { label: 'Content Management', href: '/content' },
                    { label: 'Add FAQ', href: '/content/FAQ/AddFAQ' }
                ]}
            />
            <h2 className="text-center mb-4">{location.state?.existingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</h2>
            {error && <p className="text-danger text-center">{error}</p>}

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Enter your question"
                                required
                                className="mb-3"
                                readOnly={!!location.state?.existingFAQ} // Read-only if editing
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={newAnswer}
                                onChange={(e) => setNewAnswer(e.target.value)}
                                placeholder="Provide the answer"
                                required
                                rows={4}
                                className="mb-3"
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="mb-3"
                            >
                                <option value="General">General</option>
                                <option value="Payment">Payment</option>
                                <option value="Prizes">Prizes</option>
                                <option value="Technical">Technical</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button type="submit" variant="dark" className="me-2">
                            {location.state?.existingFAQ ? 'Update FAQ' : 'Add FAQ'}
                        </Button>
                        <Button type="button" variant="secondary" onClick={resetForm}>Reset Form</Button>
                    </Col>
                </Row>
            </Form>

            <h3 className="mt-5">Existing FAQs</h3>
            <ListGroup>
                {faqs.map(faq => (
                    <ListGroup.Item key={faq._id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{faq.question}</strong> <br />
                            <small>{faq.answer}</small>
                        </div>
                        <div>
                            <Button 
                                variant="info" 
                                className="me-2" 
                                onClick={() => {
                                    setNewQuestion(faq.question);
                                    setNewAnswer(faq.answer);
                                    setSelectedCategory(faq.category);
                                    navigate('/content/FAQ/AddFAQ', { state: { existingFAQ: faq } }); // Navigate with existing FAQ
                                }}
                            >
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete(faq._id)}>Delete</Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ToastContainer />
        </Container>
    );
};

export default AddFAQ;
