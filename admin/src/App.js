import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/Navbar';

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Payment from './pages/payment/Payment';
import Settings from './pages/settings/Settings';
import AdminLogin from './adminLogin'; 
import { setAdmin } from "./redux/authSlice"; // Update with the correct path


function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth); // Get admin from Redux state
  const isAuthenticated = !!admin; // Determine authentication based on the presence of admin

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true); // State for sidebar

  const handleLogout = () => {
    dispatch(setAdmin(null)); // Clear the admin from Redux state on logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && (
          <Sidebar isSidebarOpen={isSidebarOpen} onLogout={handleLogout} style={{ width: '250px' }} />
        )}
        <div style={{ flex: 1, marginLeft: isSidebarOpen ? '250px' : '50px' }}>
          {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/admin-login"
              element={isAuthenticated ? <Navigate to="/home" /> : <AdminLogin onLogin={() => dispatch(setAdmin(/* admin data */))} />}
            />
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                {/* Add more authenticated routes here */}
              </>
            ) : (
              <Route path="*" element={<Navigate to="/admin-login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
