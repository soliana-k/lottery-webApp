import React from "react";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice"; // Correct import path
import { toast } from "sonner";
import { BiUserCircle, BiMoon, BiSun, BiEdit, BiLogOut, BiHome } from "react-icons/bi"; // Import the icons

const Navbar = () => {

 
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();
 const [showSidebar, setShowSidebar] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false); 
  const [showDropdown, setShowDropdown] = React.useState(false); 

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/logout`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode); 
  };

  const handleDropdownClick = (path) => {
    navigate(path); 
    setShowDropdown(false); 
  };

  const isDashboard = location.pathname === "/dashboard";
  
  const isDashboardPath = ["/dashboard", "/transaction", "/settings"].includes(location.pathname);

  if (isDashboardPath) {
    return null; 
  }
  const profilePhotoUrl = user?.profilePhoto ? `http://localhost:8000/${user.profilePhoto.replace(/\\/g, '/')}` : '';
  

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-white px-lg-3 py-lg-2 shadow-sm sticky-top ${
        showSidebar ? "sidebar-active" : ""
      }`}
    >
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
        <div
          className={`collapse navbar-collapse ${
            showSidebar ? "sidebar" : ""
          }`}
          id="navbarSupportedContent"
        >
          {showSidebar && (
            <button
              className="btn sidebar-close"
              onClick={closeSidebar}
            >
              <i className="bi bi-x-circle-fill"></i>
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
              <Link className="nav-link" to="/draw_results">
                Draw Results
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
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-success" to="/SignIn">
                Sign in
              </Link>
              <Link className="btn btn-outline-success" to="/SignUp">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              {profilePhotoUrl ?  (
                <img
                src={profilePhotoUrl}           alt="Profile"
                  style={{ width: 40, height: 40, borderRadius: '50%', cursor: 'pointer' }}
                  onClick={() => setShowDropdown(!showDropdown)}
                />
              ) : (

                <BiUserCircle
                  size={40}
                  className="text-primary me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowDropdown(!showDropdown)}
                />

              )}
              {showDropdown && (
                <div className="dropdown-menu show">
                  <button className="dropdown-item" onClick={() => handleDropdownClick("/dashboard")}>
                  <BiHome size={20} className="me-2" /> Dashboard
                  </button>
                  <button className="dropdown-item" onClick={() => handleDropdownClick("/edit-profile")}>
                  <BiEdit size={20} className="me-2" /> Edit Profile
                  </button>
                  <button className="dropdown-item" onClick={toggleDarkMode}>
                  {isDarkMode ? <BiSun size={20} className="me-2" /> : <BiMoon size={20} className="me-2" />} 
                    {isDarkMode ? "" : ""}
                  </button>
                  <button className="dropdown-item" onClick={logoutHandler}>
                  <BiLogOut size={20} className="me-2" /> Logout
                  </button>
                </div>
              )}
             

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
