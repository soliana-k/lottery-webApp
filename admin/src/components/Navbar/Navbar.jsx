import React, { useState } from 'react';
import './navbar.css';
import { Link } from "react-router-dom"; 
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Avatar, Menu, MenuItem } from '@mui/material'; // Import Material-UI components

const Navbar = ({ adminName, adminPhoto, toggleSidebar, isSidebarOpen }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                    <div className='item'>
                        <DarkModeOutlinedIcon className='icon'/>
                    </div>
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
