import React, { useState } from 'react';
import './adminLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading, setAdmin } from './redux/authSlice';

const AdminLogin = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post('http://localhost:8000/api/v1/admin/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAdmin(res.data.admin));
        toast.success(res.data.message);
        navigate('/home'); // Redirect to the home page
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="home-page-container">
      <div className="login-panel">
        <h2>Admin Login</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              autoComplete="off"
              placeholder="Enter your Email"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              autoComplete="off"
              placeholder="Enter Password"
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgotPassword">Forgot Password</Link>
          </div>
          {loading ? (
            <button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </button>
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
