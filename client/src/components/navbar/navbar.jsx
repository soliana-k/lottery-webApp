import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice"; // Correct import path

import { toast } from "sonner";
import { Image, Nav, NavDropdown, Button } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi"; // Import the Bootstrap icon

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  console.log('User:', user); // Check if user state updates properly

  const [showSidebar, setShowSidebar] = React.useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };




  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top ${showSidebar ? 'sidebar-active' : ''}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Double B
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={showSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
         <div className={`collapse navbar-collapse ${showSidebar ? 'sidebar' : ''}`} id="navbarSupportedContent">
          {showSidebar && (
            <button className="btn sidebar-close" onClick={closeSidebar}><i className="bi bi-x-circle-fill"></i>
            </button>
          )}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold h-font">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/How_it_works">
                How It Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prizes">
                Prizes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/faq">
                FAQ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Contact">
                Contact
              </Link>
            </li>
          </ul>
          {!user ? (
            <>
              <div className="d-flex gap-2">

              <Link className="btn btn-outline-success" to="/SignIn">
                Sign in
              </Link>
              <Link className="btn btn-outline-success" to="/SignUp">
                Sign Up
              </Link>
              </div>
            </>
          ) : (
            <>
            <Link to="/dashboard" className="d-flex align-items-center">
              <BiUserCircle
                size={40}
                className="text-primary me-2"
                style={{ cursor: 'pointer' }}
              />
            </Link>
            <button className="btn btn-outline-success" onClick={logoutHandler} >Logout</button>
          </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
