import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const PaymentModal = ({ show, handleClose, paymentMethod }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirmPayment = () => {
        setLoading(true); // Show loading spinner
        // Simulate a delay for payment processing
        setTimeout(() => {
            setLoading(false); // Hide loading spinner after processing
            handleClose(); // Close the modal
        }, 2000); // Simulate payment delay (2 seconds)
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Processing Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Your payment is being processed using {paymentMethod}. Please provide the necessary details.</p>
                {paymentMethod === 'PayPal' && (
                    <div>
                        <h5>PayPal Payment</h5>
                        <p>You'll be redirected to PayPal for payment. Please follow the instructions there.</p>
                    </div>
                )}
                {paymentMethod === 'Credit/Debit Card' && (
                    <Form>
                        <Form.Group controlId="formCardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter card number" />
                        </Form.Group>
                        <Form.Group controlId="formCardExpiry">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control type="text" placeholder="MM/YY" />
                        </Form.Group>
                        <Form.Group controlId="formCardCVC">
                            <Form.Label>CVC</Form.Label>
                            <Form.Control type="text" placeholder="CVC" />
                        </Form.Group>
                    </Form>
                )}
                {loading && (
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmPayment} disabled={loading}>
                    Confirm Payment
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
