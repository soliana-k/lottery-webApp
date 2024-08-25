import React, { useState } from 'react';
import './navbar.css';
import { Link } from "react-router-dom"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { BiUserCircle, BiMoon, BiSun, BiEdit, BiLogOut, BiHome } from "react-icons/bi";
import { setAdmin } from "../../redux/authSlice"; // Update with the correct path
import axios from "axios";


const Navbar = ({ adminName, adminPhoto, toggleSidebar, isSidebarOpen }) => {
    const { admin } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const location = useLocation();
    const [showSidebar, setShowSidebar] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false); 
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [showSearchInput, setShowSearchInput] = React.useState(false); 

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
    };

    const handleDropdownClick = (path) => {
        navigate(path); 
        setShowDropdown(false); 
    };

    const toggleSearchInput = () => {
        setShowSearchInput(!showSearchInput);
    };

    const handleLogout = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/v1/admin/logout`,
            { withCredentials: true }
          );
          if (res.data.success) {
            dispatch(setAdmin(null));
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className='navbar2'>
            <div className='wrapper'>
                <div className='item'>
                    <ListOutlinedIcon className='icon' onClick={toggleSidebar} />
                </div>
                <div className={`search ${showSearchInput ? 'show-input' : ''}`}>
                    <input type='text' placeholder='search...'/>
                    <SearchOutlinedIcon onClick={toggleSearchInput} />
                </div>
                <div className='items'>
                    <div className='item'>
                        <LanguageOutlinedIcon className='icon'/>
                        English
                    </div>
                    <button className="dropdown-item" onClick={toggleDarkMode}>
                        {isDarkMode ? <BiMoon size={20} className="me-2" /> : <BiSun size={20} className="me-2"/>}
                    </button>
                    <div className='item'>
                        <NotificationsNoneOutlinedIcon className='icon'/>
                        <div className='counter'>1</div>
                    </div>
                    <div className='item'>
                        <ChatBubbleOutlineOutlinedIcon className='icon'/>
                        <div className='counter'>2</div>
                    </div>
                    <div className='item'>
                        <BiUserCircle
                            size={40}
                            className="text-primary me-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        {showDropdown && (
                            <div className="dropdown-menu show">
                                <button className="dropdown-item" onClick={() => handleDropdownClick("/admin-info")}>
                                    <BiHome size={20} className="me-2" /> My Profile
                                </button>
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
        </div> 
    );
};

export default Navbar;
