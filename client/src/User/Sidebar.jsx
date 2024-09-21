import React, { useState } from 'react';  // Import useState hook
import { Link } from 'react-router-dom';
import './Sidebar.css';
import 'boxicons/css/boxicons.min.css';
import { setUser } from '../redux/authSlice';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Sidebar = ({ isSidebarOpen,onLogout }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeMenu, setActiveMenu] = React.useState('Dashboard');
  const [showUsers, setShowUsers] = React.useState(true);

  // Function to handle menu clicks
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };

  const handleLogout = async () => {
    try {
        const res = await axios.get(
            `http://localhost:8000/api/v1/user/logout`,
            { withCredentials: true }
        );
        
        if (res.data.success) {
            dispatch(setUser(null)); 
            onLogout(); // Call the onLogout prop to update the authentication state
            navigate("/");
        } else {
            console.error("Logout response unsuccessful:", res.data);
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};
  return (
    <section
      id="sidebar"
      className={isSidebarOpen ? "sidebar-open" : "sidebar-closed"}
    >
      <Link to="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">{isSidebarOpen ? "DoubleB" : ""}</span>
      </Link>
      <ul className="side-menu">
         <li className={activeMenu === "Home" ? "active" : ""}>
          <Link to="/" onClick={() => handleMenuClick("Home")}>
            <i className='bx bxs-home'></i>
            <span className="text">{isSidebarOpen ? "Home" : ""}</span>
          </Link>
        </li>
        <li className={activeMenu === "Dashboard" ? "active" : ""}>
          <Link to="/dashboard" onClick={() => handleMenuClick("Dashboard")}>
            <i className="bx bxs-dashboard"></i>
            <span className="text">{isSidebarOpen ? "Dashboard" : ""}</span>
          </Link>
        </li>
        <li className={activeMenu === "Transaction History" ? "active" : ""}>
          <Link to="/transaction" onClick={() => handleMenuClick("Transaction History")}>
            <i className='bx bxs-wallet-alt'></i>
            <span className="text">{isSidebarOpen ? "Transaction History" : ""}</span>
          </Link>
        </li>
      </ul>
      <ul className="side-menu">
        {/* Settings
        <li className={activeMenu === "Settings" ? "active" : ""}>
          <Link to="/settings" onClick={() => handleMenuClick("Settings")}>
            <i className="bx bxs-cog"></i>
            <span className="text">{isSidebarOpen ? "Settings" : ""}</span>
          </Link>
        </li> */}

        {/* Logout */}
        <li className={activeMenu === "Logout" ? "active" : ""}>
          <Link to="/" className="logout" onClick={handleLogout}>
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">{isSidebarOpen ? "Logout" : ""}</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
