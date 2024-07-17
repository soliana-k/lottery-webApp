import React, { useState } from "react";
import './navbar.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLoginModal = () => setShowLoginModal(!showLoginModal);
    const handleRegisterModal = () => setShowRegisterModal(!showRegisterModal);
    const handleClose = () => {
        setShowLoginModal(false);
        setShowRegisterModal(false);
    };






    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" href="App.js">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/How_it_works">How It Works</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/prizes">Prizes</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/faq">FAQ</Link>                        
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contact</Link>
                        </li>
                        
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-success" type="button"  onClick={handleLoginModal}>Login</button>
                    </form>
                    <form className="d-flex">
                       
                        <button className="btn btn-outline-success m-2" type="button" onClick={handleRegisterModal}>Register</button>
                    </form>
                </div>
            </div>
            <Modal
    show={showLoginModal}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
>
    <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" placeholder="Enter your password" />
            </div>
            <div className="mb-3">
                <a href="#" className="d-block text-end">Forgot Password?</a>
            </div>
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Login</Button>
    </Modal.Footer>
</Modal>

              <Modal
    show={showRegisterModal}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
>
    <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter your password" />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" />
            </div>
            <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="agreeTerms" />
                <label className="form-check-label" htmlFor="agreeTerms">Agree to Terms and Conditions</label>
            </div>
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Register</Button>
    </Modal.Footer>
</Modal>

        </nav>
        );
    }
    export default Navbar;
      
        
        