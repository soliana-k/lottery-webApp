import React, { useState, useEffect } from 'react';
import './TopNavBar.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/authSlice.js';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { BiUserCircle, BiEdit, BiLogOut} from "react-icons/bi";
import 'boxicons/css/boxicons.min.css';
import axios from "axios";
import DarkMode from './DarkMode';

const TopNavBar = ({ toggleSidebar, onLogout }) => {
  const { user } = useSelector((store) => store.auth);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDarkMode = () => {
  const newDarkMode = !isDarkMode;
  setIsDarkMode(newDarkMode);
  document.body.classList.toggle("dark-mode", newDarkMode);
  localStorage.setItem("darkMode", newDarkMode); // Store the preference
};

const handleDropdownClick = (path) => {
  navigate(path); 
  setShowDropdown(false); 
};

useEffect(() => {
  const fetchUserData = async () => {
      try {
          if (user?._id) {  
              const response = await axios.get(`http://localhost:8000/api/v1/user/${user._id}`);
              setUserDetails(response.data);
          } else {
              console.error('User ID not found in Redux state.');
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };

  fetchUserData();
}, [user]);

useEffect(() => {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  setIsDarkMode(savedDarkMode);
  if (savedDarkMode) {
      document.body.classList.add("dark-mode");
  } else {
      document.body.classList.remove("dark-mode");
  }
}, []);


const handleLogout = async () => {
  try {
      const res = await axios.get(
          `http://localhost:3000/api/v1/user/logout`,
          { withCredentials: true }
      );
      
      if (res.data.success) {
          dispatch(setUser(null)); 
          onLogout(); 
          navigate("/");
      } else {
          console.error("Logout response unsuccessful:", res.data);
      }
  } catch (error) {
      console.error("Logout error:", error);
  }
};

  return (
    <nav className="dashboard-nav">
     <div className='wrapper'>
                <div className='item'>
                    <ListOutlinedIcon className='icon' onClick={toggleSidebar} />
                </div>
                <div className='items'>
                    <button className="dropdown-item" onClick={toggleDarkMode}>
                    <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </button>
                    <Link to="#" className="notification-icon">
                      <i className="bx bxs-bell"></i>
                      <span className="notification-count">1</span>
                    </Link>
                    <div className='item'>
                        {userDetails?.profilePhoto ? (
                            <img
                                src={`http://localhost:3000/${userDetails.profilePhoto}`} 
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
                                <button className="dropdown-item" onClick={() => handleDropdownClick("/edit-profile")}>
                                    <BiEdit size={20} className="me-2" /> Edit Profile
                                </button>
                                <button className="dropdown-item" onClick={handleLogout}>
                                    <BiLogOut size={20} className="me-2" /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    </nav>
  );
};

export default TopNavBar;