import React, { useState } from 'react';
import './navbar.css';
import { Link } from "react-router-dom"; 
import {  useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Avatar, Menu, MenuItem } from '@mui/material'; // Import Material-UI components
import { BiUserCircle, BiMoon, BiSun, BiEdit, BiLogOut, BiHome } from "react-icons/bi";

const Navbar = ({ adminName, adminPhoto, toggleSidebar, isSidebarOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const { admin } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();
 const [showSidebar, setShowSidebar] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false); 
    const [showDropdown, setShowDropdown] = React.useState(false); 

    const handleClose = () => {
        setAnchorEl(null);
    };

 

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode); // Toggle dark-mode class on the body
      };

    return (
        <div className='navbar2'>
            <div className='wrapper'>
                <div className='item'>
                    <ListOutlinedIcon className='icon' onClick={toggleSidebar} />
                </div>
                <div className='search'>
                    <input type='text' placeholder='search...'/>
                    <SearchOutlinedIcon />
                </div>
                <div className='items'>
                    <div className='item'>
                        <LanguageOutlinedIcon className='icon'/>
                        English
                    </div>
                    <button className="dropdown-item" onClick={toggleDarkMode}>
                  {isDarkMode ?  <BiMoon size={20} className="me-2" /> : <BiSun size={20} className="me-2"/>} 
                    {isDarkMode ? "" : ""}
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
                        <Avatar
                            src={adminPhoto}  // Admin photo URL
                            alt={adminName}
                            style={{ cursor: "pointer" }}
                            onClick={handleClick}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to="/dashboard" className="menu-item">Dashboard</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/edit-profile" className="menu-item">Edit Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to="/logout" className="menu-item">Logout</Link>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default Navbar;
