import "./sidebar.css";
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useState } from 'react';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";


const Sidebar = () => {
  const [showUsers, setShowUsers] = useState(true);
 
  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };




  return (
    <div className="sidebar2">
      <div className="top">
        <span className="logo">DoubleB</span>
      </div>
      
      <div className="center">
        <ul>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <hr/>
          <li onClick={handleUsersClick}>
            <PeopleIcon className="icon"/>
            <span>Users</span>
            {showUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </li>
          {showUsers && (
            <ul className="nested">
              <li>
              <ListAltIcon className="icon"/>
                <span>User List</span>
              </li>
              <li>
                <AddBoxIcon className="icon"/>
                <span>New Users</span>
              </li>
              <li>
                <StarIcon className="icon"/>
                <span>Winners</span>
              </li>
            </ul>
          )}
          <hr/>
        
         
          
          <li>

          <MonetizationOnIcon className="icon"/>
          <span>payment</span>
          </li>
          <hr/>
         
         
          <li>
                <NotificationsNoneOutlinedIcon className="icon"/>
                <span>Notifications</span>
              </li>
              <hr/>
              <li>
                <ChatBubbleOutlineOutlinedIcon className="icon"/>
                <span>Messages</span>
              </li>
              <hr/>
              <li>
              <SettingsOutlinedIcon className="icon"/>

                <span>Setting</span>
              </li>
              <hr/>
              
              <li>
              <LogoutOutlinedIcon className="icon"/>

                <span>Logout</span>
              </li>
              <hr/>
              
              
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Sidebar;
