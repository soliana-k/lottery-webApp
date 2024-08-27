import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import 'boxicons/css/boxicons.min.css';
import { setAdmin } from "../../redux/authSlice"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Sidebar = ({ isSidebarOpen,onLogout }) => {
  const { admin } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [activeMenu, setActiveMenu] = React.useState('Dashboard');
  const [showUsers, setShowUsers] = React.useState(true);
 
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };



  const handleLogout = async () => {
    try {
        const res = await axios.get(
            `http://localhost:8000/api/v1/admin/logout`,
            { withCredentials: true }
        );
        
        if (res.data.success) {
            dispatch(setAdmin(null)); 
            onLogout(); // Call the onLogout prop to update the authentication state
            navigate("/admin-login");
        } else {
            console.error("Logout response unsuccessful:", res.data);
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
};
  return (
    <section id="sidebar" className={isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <Link to="#" className="brand">
        <i className='bx bxs-smile'></i>
        <span className="text">{isSidebarOpen ? 'DoubleB' : ''}</span>
      </Link>
      <ul className="side-menu">
      
        <li className={activeMenu === 'Home' ? 'active' : ''}>
          <Link to="/home" onClick={() => handleMenuClick('Home')}>
            <i className='bx bxs-home'></i>
            <span className="text">{isSidebarOpen ? 'Home' : ''}</span>
          </Link>
        </li>
        <li className={activeMenu === 'Dashboard' ? 'active' : ''}>
          <Link to="/home" onClick={() => handleMenuClick('Dashboard')}>
            <i className='bx bxs-dashboard'></i>
            <span className="text">{isSidebarOpen ? 'Dashboard' : ''}</span>
          </Link>
        </li>
        <li onClick={handleUsersClick} className={activeMenu === 'Users' ? 'active' : ''}>
          <a href="#" onClick={() => handleMenuClick('Users')}>
            <i className='bx bxs-group'></i>
            <span className="text">{isSidebarOpen ? 'Users' : ''}</span>
            {showUsers ? <i className='bx bx-chevron-up'></i> : <i className='bx bx-chevron-down'></i>}
          </a>
        </li>
        {showUsers && (
          <ul className="nested">
            <li className={activeMenu === 'User List' ? 'active' : ''}>
              <Link to="/user-list" onClick={() => handleMenuClick('User List')}>
              <i className='bx bxs-group'></i>
                <span className="text">{isSidebarOpen ? 'User List' : ''}</span>
              </Link>
            </li>
            <li className={activeMenu === 'New Users' ? 'active' : ''}>
              <Link to="/new-users" onClick={() => handleMenuClick('New Users')}>
                <i className='bx bxs-user-plus'></i>
                <span className="text">{isSidebarOpen ? 'New Users' : ''}</span>
              </Link>
            </li>
            <li className={activeMenu === 'Winners' ? 'active' : ''}>
              <Link to="/winners" onClick={() => handleMenuClick('Winners')}>
                <i className='bx bxs-star'></i>
                <span className="text">{isSidebarOpen ? 'Winners' : ''}</span>
              </Link>
            </li>
          </ul>
        )}
        <li className={activeMenu === 'Payment' ? 'active' : ''}>
          <Link to="/payment" onClick={() => handleMenuClick('Payment')}>
            <i className='bx bxs-credit-card'></i>
            <span className="text">{isSidebarOpen ? 'Payment' : ''}</span>
          </Link>
        </li>
        </ul>
        <ul className="side-menu">
        {/* Settings */}
        <li className={activeMenu === 'Settings' ? 'active' : ''}>
          <Link to="/settings" onClick={() => handleMenuClick('Settings')}>
            <i className='bx bxs-cog'></i>
            <span className="text">{isSidebarOpen ? 'Setting' : ''}</span>
          </Link>
        </li>

        {/* Logout */}
        <li className={activeMenu === 'Logout' ? 'active' : ''}>
          <Link to="/admin-login" className="logout" onClick={handleLogout}>
            <i className='bx bxs-log-out-circle'></i>
            <span className="text">{isSidebarOpen ? 'Logout' : ''}</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
