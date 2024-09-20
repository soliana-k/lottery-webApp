import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '../../breadcrumb';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ManageFAQs.css'; 

const ManageFAQs = () => {
    const [submittedQuestions, setSubmittedQuestions] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchSubmittedQuestions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/v1/faq/submitted');
            setSubmittedQuestions(response.data);
        } catch (err) {
            setError('Error fetching submitted questions.');
            toast.error('Error fetching submitted questions.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAnswer = (question) => {
        navigate(`/content/FAQ/AddFAQ`, {
            state: { question: question.question, phone: question.phone, questionId: question._id }
        });
    };

    const handleDelete = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/faq/questions/${questionId}`);
                fetchSubmittedQuestions();
                toast.success('Question deleted successfully!');
            } catch (err) {
                console.error(err);
                toast.error('Error deleting question: ' + (err.response ? err.response.data.message : err.message));
            }
        }
    };

    useEffect(() => {
        fetchSubmittedQuestions();
    }, []);

    return (
        <Container className="content-management-container">
            <Breadcrumbs 
                items={[
                    { label: 'Home', href: '/home' },
                    { label: 'Content Management', href: '/content' },
                    { label: 'Manage FAQs', href: '/content/FAQ/ManageFAQs' }
                ]}
            />
            <h2 className="text-center my-4">Manage Submitted Questions</h2>

            {error && <p className="text-danger text-center">{error}</p>}

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Row className="justify-content-center">
                    <Col xs={12} md={10}>
                        <Table striped bordered hover responsive className="mt-3 text-center">
                            <thead className="table-header">
                                <tr>
                                    <th>Phone Number</th>
                                    <th>Submitted Question</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {submittedQuestions.map((question) => (
                                    <tr key={question._id}>
                                        <td>{question.phone}</td> {/* Display the phone number here */}
                                        <td>
                                            {question.question} {question.answered ? '✔️ (Answered)' : ''}
                                        </td>
                                        <td>
                                            <Button 
                                                variant="success" 
                                                className="me-2 mb-2 action-btn"
                                                onClick={() => handleAddAnswer(question)}
                                            >
                                                Add Answer
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                className="mb-2 action-btn"
                                                onClick={() => handleDelete(question._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            )}

            <ToastContainer />
        </Container>
    );
};

export default ManageFAQs;
