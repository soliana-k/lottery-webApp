import React, { useState } from 'react';
import './adminLogin.css'; // Assuming you want to add some styles
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform your login logic here
        console.log('Login attempted with:', { email, password });
        onLogin(); // Call the onLogin function to update the auth state
        navigate('/home'); // Navigate to the home page on successful login
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
        console.log('Forgot password clicked');
    };

    return (
        
        <div className="login-panel">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <div className="forgot-password">
                    <button type="button" onClick={handleForgotPassword}>
                        Forgot Password?
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
