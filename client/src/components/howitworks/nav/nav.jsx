import React, { useState } from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';

const NavBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginModal = () => setShowLoginModal(!showLoginModal);
    const handleRegisterModal = () => setShowRegisterModal(!showRegisterModal);
    const handleClose = () => {
        setShowLoginModal(false);
        setShowRegisterModal(false);
    };

    return (
        <>
            <Navbar bg="custom" expand="lg" className="navbar-custom">
                <Navbar.Brand as={Link} to="/">Double B</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/How_it_works">How It Works</Nav.Link>
                        <Nav.Link as={Link} to="/prizes">Prizes</Nav.Link>
                        <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                        <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
                    </Nav>
                    <Button variant="outline-light" onClick={handleLoginModal}>Login</Button>
                    <Button variant="outline-light" className="ml-2" onClick={handleRegisterModal}>Register</Button>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={showLoginModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Text className="text-muted">
                                <a href="#Link">Forgot Password?</a>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Login</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRegisterModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm your password" />
                        </Form.Group>
                        <Form.Group controlId="agreeTerms" className="mb-3">
                            <Form.Check type="checkbox" label="Agree to Terms and Conditions" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary">Register</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavBar;
