import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/authSlice.js';
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import './UserDashboard.css';
import 'boxicons/css/boxicons.min.css';
import { BiUserCircle, BiMoon, BiSun, BiEdit, BiLogOut, BiHome } from "react-icons/bi";
import Sidebar from './Sidebar.jsx';
import { Card } from 'react-bootstrap';
import axios from "axios";
import DarkMode from './DarkMode';
import UserInfoForm from './Settings/ProfileInfo';
import UserEditProfile from './Settings/EditProfile.jsx';

const TopNavigationBar = ({ toggleSidebar, onLogout }) => {
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


  return (
    <nav className="dashboard-nav">
      <div className="menu-toggle" onClick={toggleSidebar}>
        <i className="bx bx-menu" onClick={toggleSidebar}></i>
      </div>
      {/* Dark Mode Toggle */}
      <DarkMode isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Link to="#" className="notification-icon">
        <i className="bx bxs-bell"></i>
        <span className="notification-count">8</span>
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
                                <button className="dropdown-item" onClick={() => handleDropdownClick("/user-info-form")}>
                                    <BiEdit size={20} className="me-2" /> Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
    </nav>
  );
};

const UserDashboard = () => {
  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'Upcoming draw on 2024-08-01!', date: '2024-07-25' },
    { id: 2, message: 'Congratulations to the winners of the July draw!', date: '2024-07-21' },
    { id: 3, message: 'Your ticket purchase was successful!', date: '2024-07-22' },
    // Add more notifications as needed
  ];

  // Sample data for transactions
  const transactions = [
    { item: 'Chair', amount: '2000.00 br', date: '2024-08-01' },
    { item: 'Dining table', amount: '6000.00 br', date: '2024-08-02' },
    // Add more transactions as needed
  ];

  return (
    <div className="dashboard-container">
      {/* Main content of the dashboard */}
      <main className="dashboard-main">
        {/* Dashboard header */}
        <div className="dashboard-header">
            <h1 className="header-title">Dashboard</h1>
        </div>
        

        {/* Table and Notification sections */}
        <div className="table-section">
          {/* Notification Section */}
          <Card className="notification-section">
            <Card.Header className="notification-header d-flex justify-content-between align-items-center">
              <h3>Notifications</h3>
              <div>
                <i className="bx bx-bell"></i>
                <i className="bx bx-filter ml-2"></i>
              </div>
            </Card.Header>
            <Card.Body>
              {/* List for displaying notifications */}
              <ul className="notification-list">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="notification-item d-flex justify-content-between align-items-center"
                  >
                    <p>{notification.message}</p>
                    <span className="notification-date">{notification.date}</span>
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          {/* Transaction History Section */}
          <Card className="transaction-history">
            <Card.Header className="transaction-header d-flex justify-content-between align-items-center">
              <h3>Transaction History</h3>
              <div>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter ml-2"></i>
              </div>
            </Card.Header>
            <Card.Body>
              {/* Table for displaying transaction history */}
              <table className="transaction-table table table-borderless">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Payment Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.item}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>

      </main>
    </div>
  );
};

const DashboardWrapper = () => {
  const location = useLocation(); // Use location to determine the current path
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode); // Function to toggle dark mode
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Function to toggle sidebar

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar isSidebarOpen={isSidebarOpen} /> {/* Sidebar component */}
      <section className={`dashboard-content ${isSidebarOpen ? 'content-expanded' : 'content-collapsed'}`}>
        {/* Top Navigation Bar */}
        <TopNavigationBar
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          toggleSidebar={toggleSidebar}
        />
        {/* Conditional rendering based on the current path */}
        {location.pathname === '/dashboard' && <UserDashboard />}
      </section>
    </div>
  );
};

export default DashboardWrapper;

