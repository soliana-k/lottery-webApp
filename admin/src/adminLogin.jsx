import React, { useState } from 'react';
import './adminLogin.css'; // Assuming you want to add some styles
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading } from "./redux/authSlice";
import { setAdmin } from './redux/authSlice'; 

const AdminLogin = () => {

     const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
    email:"",
    password:"",
  });

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

   
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();


        try {
            dispatch(setLoading(true));
            const res = await axios.post("http://localhost:8000/api/v1/admin/login",
              input, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials:true,
            });
            if(res.data.success){
              dispatch(setAdmin(res.data.user));
              navigate("/")
              toast.success(res.data.message);
            }
             
          }catch (error){
            console.log(error)
            toast.error(error.response.data.message);
      
      
          }finally{
            dispatch(setLoading(false));
          }
          
          
        };
      
      
    return (
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
                <Link to="/forgotPassword">Forgot Password</Link>
          {
            loading ? <button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait... </button> : <button type="submit" className="btn btn-primary">
            Login
          </button>

          }
            
               
            </form>
        </div>
    );
};

export default AdminLogin;
