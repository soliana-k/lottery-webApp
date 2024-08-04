import "./sidebar.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import HomeIcon from '@mui/icons-material/Home';

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
          <span className="title">MAIN</span>
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <DashboardIcon className="icon" />
              <span className="D">Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link to="/home" className="sidebar-link">
              <HomeIcon className="icon"/>
              <span>Home</span>
            </Link>
          </li>
          
          <li onClick={handleUsersClick}>
            <Link to="#" className="sidebar-link">
              <PeopleIcon className="icon"/>
              <span>Users</span>
              {showUsers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Link>
          </li>
          {showUsers && (
            <ul className="nested">
              <li>
                <Link to="/user-list" className="sidebar-link">
                  <ListAltIcon className="icon"/>
                  <span>User List</span>
                </Link>
              </li>
              <li>
                <Link to="/new-users" className="sidebar-link">
                  <AddBoxIcon className="icon"/>
                  <span>New Users</span>
                </Link>
              </li>
              <li>
                <Link to="/winners" className="sidebar-link">
                  <StarIcon className="icon"/>
                  <span>Winners</span>
                </Link>
              </li>
            </ul>
          )}
          
          <li>
            <Link to="/payment" className="sidebar-link">
              <MonetizationOnIcon className="icon"/>
              <span>Payment</span>
            </Link>
          </li>
          
         
          <span className="title">Settings</span>
          <li>
            <Link to="/settings" className="sidebar-link">
              <SettingsOutlinedIcon className="icon"/>
              <span>Settings</span>
            </Link>
          </li>
          
          <li>
            <Link to="/logout" className="sidebar-link logout">
              <LogoutOutlinedIcon className="icon"/>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default Sidebar;
