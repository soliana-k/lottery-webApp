import React, { useState } from 'react';
import './ForgotPassword.css'; 
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8000/api/v1/user/forgot-password",{
        email
    }).then(response => {
        if(response.data.status){
            alert("check your email for reset password link")
            navigate('/login')
        }
    }).catch(error => {
        console.log(error)
    })

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setSuccess('A password reset link has been sent to your email address.');
    setEmail('');
  };

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
