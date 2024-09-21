import React, { useState, useEffect } from 'react';
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import { BiUserCircle, BiMoon, BiSun, BiEdit, BiLogOut, BiHome } from "react-icons/bi";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const toggleDarkMode = () => {
    const isDark = !isDarkMode;
    setIsDarkMode(isDark);
    document.body.classList.toggle("dark-mode", isDark); // Fixed to reflect the actual dark mode state
  };

  const handleDropdownClick = (path) => {
    navigate(path); 
    setShowDropdown(false); 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id) {  
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/user/${user._id}`);
          setUserDetails(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const isDashboardPath = ["/dashboard", "/transaction", "/settings", "/user-info-form", "/user-edit-profile"].includes(location.pathname);

  if (isDashboardPath) {
    return null; 
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-light px-lg-3 py-lg-2 shadow-sm sticky-top ${showSidebar ? "sidebar-active" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Double B</Link>
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
        <div className={`collapse navbar-collapse ${showSidebar ? "sidebar" : ""}`} id="navbarSupportedContent">
          {showSidebar && (
            <button className="btn sidebar-close" onClick={closeSidebar}>
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-bold h-font">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/How_it_works">How It Works</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/draw_results">Draw Results</Link>
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
          {!user ? (
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-success" to="/SignIn">Sign in</Link>
              <Link className="btn btn-outline-success" to="/SignUp">Sign Up</Link>
            </div>
          ) : (
            <div className="d-flex align-items-center position-relative">
              {userDetails?.profilePhoto ? (
                <img
                  src={`http://localhost:8000/${userDetails.profilePhoto}`}
                  alt="User"
                  className="profile-photo"
                  onClick={() => setShowDropdown(!showDropdown)}
                  style={{ cursor: "pointer", width: 40, height: 40, borderRadius: '50%' }}
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
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
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
