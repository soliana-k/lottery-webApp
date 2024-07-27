// pages/SignUp.jsx
import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "../redux/authSlice";

const SignUp = () => {
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    file: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/SignIn");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit} className="addUserForm">
        <div className="inputGroup">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            value={input.fullname}
            id="fullname"
            name="fullname"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={input.email}
            id="email"
            name="email"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your Email"
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            value={input.phoneNumber}
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your Phone number"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={input.password}
            id="password"
            name="password"
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter Password"
          />
          <label htmlFor="file">Profile Photo:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
          />

          {loading ? (
            <button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait...{" "}
            </button>
          ) : (
            <button type="submit" className="btn btn-success">
              Sign Up
            </button>
          )}
        </div>
      </form>
      <div className="login">
        <p>Already have an Account? </p>
        <Link to="/SignIn" type="submit" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;