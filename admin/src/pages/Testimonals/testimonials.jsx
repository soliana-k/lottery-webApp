// frontend/src/pages/AdminTestimonial.jsx

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Table, Modal, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Breadcrumbs from '../../breadcrumb'; // Ensure correct path

const AdminTestimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch testimonials data
    const fetchTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/admin/testimonials');
            setTestimonials(response.data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle testimonial approval
    const handleApprove = async (id) => {
        try {
            await axios.put(`http://localhost:8000/api/v1/admin/testimonials/${id}/approve`);
            fetchTestimonials(); // Refresh testimonials
            setFeedbackMessage('Testimonial approved successfully.');
        } catch (error) {
            console.error('Error approving testimonial:', error);
            setFeedbackMessage('Error approving testimonial.');
        }
    };

    // Handle testimonial deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/v1/admin/testimonials/${id}`);
            fetchTestimonials(); // Refresh testimonials
            setFeedbackMessage('Testimonial deleted successfully.');
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            setFeedbackMessage('Error deleting testimonial.');
        }
    };

    // Show details of a testimonial in a modal
    const handleShowDetails = (testimonial) => {
        setSelectedTestimonial(testimonial);
        setShowModal(true);
    };

    // Load testimonials on component mount
    useEffect(() => {
        fetchTestimonials();
    }, []);

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <div className="page-wrapper">
            <Container className="mt-5">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/home' },
                        { label: 'Content Management', href: '/content' },
                        { label: 'Testimonial Management', href: '/testimonial-management' },
                    ]}
                />
                <Row>
                    <Col md={12}>
                        <h1 className="mb-4 text-center">Manage Testimonials</h1>

                        {/* Feedback Message */}
                        {feedbackMessage && (
                            <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
                                {feedbackMessage}
                            </Alert>
                        )}

                        {/* Testimonials Table */}
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Testimonial</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonials.map((testimonial) => (
                                    <tr key={testimonial._id}>
                                        <td>{testimonial.name}</td>
                                        <td>{testimonial.testimonial}</td>
                                        <td>
                                            {!testimonial.approved && (
                                                <Button variant="success" onClick={() => handleApprove(testimonial._id)} className="me-2">
                                                    Approve
                                                </Button>
                                            )}
                                            <Button variant="danger" onClick={() => handleDelete(testimonial._id)}>
                                                Delete
                                            </Button>
                                            <Button variant="info" onClick={() => handleShowDetails(testimonial)} className="ms-2">
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Modal for Testimonial Details */}
                        {selectedTestimonial && (
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Testimonial Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="testimonialName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" value={selectedTestimonial.name} readOnly />
                                        </Form.Group>
                                        <Form.Group controlId="testimonialEmail" className="mt-3">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={selectedTestimonial.email} readOnly />
                                        </Form.Group>
                                        <Form.Group controlId="testimonialContent" className="mt-3">
                                            <Form.Label>Testimonial</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={selectedTestimonial.testimonial} readOnly />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminTestimonial;
