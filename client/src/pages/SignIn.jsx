import React, { useState } from "react";
import "./SignIn.css";
import { Link , useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; 

import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { setLoading } from "../redux/authSlice";
import { setUser } from '../redux/authSlice'; 

const Login = () => {

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
      const res = await axios.post("http://localhost:8000/api/v1/user/login",
        input, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials:true,
      });
      if(res.data.success){
        dispatch(setUser(res.data.user));
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
    <div className="addUser">
      <h3>Sign in</h3>
      <form onSubmit={submitHandler} className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={input.email}
            id="email"
            name="email"
            onChange={changeEventHandler}
            autoComplete="off"
            placeholder="Enter your Email"
          />
           <label htmlFor="Password">Password:</label>
          <input
            type="password"
            value={input.password}
            id="password"
            name="password"
            onChange={changeEventHandler}
            autoComplete="off"
            placeholder="Enter Password"
          />
          
          <Link to="/forgotPassword">Forgot Password</Link>
          {
            loading ? <button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> please wait... </button> : <button type="submit" className="btn btn-primary">
            Login
          </button>

          }
            
          
          
        </div>
      </form>
      <div className="login">
        <p>Don't have Account? </p>
        <Link to="/SignUp" type="submit" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;