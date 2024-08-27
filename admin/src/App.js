import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';

import Navbar from './components/navbar/Navbar';
import AdminInfoForm from './components/navbar/AdminInfoForm';
import EditProfile from './components/navbar/EditProfile'

import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Payment from './pages/payment/Payment';
import Settings from './pages/settings/Settings';
import Logout from './pages/logout/Logout';
import AdminFaq from './pages/FAQ/AdminFaq';
import ContentManagement from './pages/ContentManagement/ContentManagement';
import UserManagement from './UserManagement';
import Testimonals from './pages/Testimonals/testimonials';
import NumberManagement from './NumberManagement';
import UserList from './UserList'; 
import AdminDashboard from './components/AdminChange';
import DrawManagement from './draw'; 
import AdminBannerSettings from './components/AdminBannerSettings';

import AdminLogin from './adminLogin'; 
import AdminRegistration from './adminRegistration'; 

import History from './pages/NumberManagement/history';
import NumberStatusAvailability from './pages/NumberManagement/NumberStatus';
import CombinedAuditLogViewer from './pages/NumberManagement/AuditLog';
import NumManagement from './pages/NumberManagement/numManagement';
import { setAdmin } from "./redux/authSlice"; // Update with the correct path

function App() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.auth);
  const isAuthenticated = !!admin;
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar

  // const handleLogin = () => {
  //   setIsAuthenticated(true);
  // };

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
                <Route path="/adminRegistration" element={<AdminRegistration />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/number" element={<NumberManagement />} />
                <Route path="/user" element={<UserManagement />} />
                <Route path="/admin-info" element={<AdminInfoForm />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/draw" element={<DrawManagement />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/draw-history" element={<History />} />
                <Route path="/numbermgmt" element={<NumberStatusAvailability />} />
                <Route path="/audit-logs" element={<CombinedAuditLogViewer />} />
                <Route path="/num" element={<NumManagement />} />
                <Route path="/content/FAQ/AdminFaq" element={<AdminFaq />} />
                <Route path="/content/Testimonals/testimonials" element={<Testimonals />} />
                <Route path="/content/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/content/AdminBannerSettings" element={<AdminBannerSettings />} />
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
