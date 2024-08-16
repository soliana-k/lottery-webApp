import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/Navbar';
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

import DrawManagement from './draw'; 
import AdminLogin from './adminLogin'; 
import AdminRegistration from './adminRegistration'; 

import History from './pages/NumberManagement/history';
import NumberStatusAvailability from './pages/NumberManagement/NumberStatus';
import CombinedAuditLogViewer from './pages/NumberManagement/AuditLog';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ flex: 1 }}>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/admin-login"
              element={isAuthenticated ? <Navigate to="/home" /> : <AdminLogin onLogin={handleLogin} />}
            />
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/user" element={<User />} /> */}
                <Route path="/payment" element={<Payment />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/adminRegistration" element={<AdminRegistration />} />
                <Route path="/content" element={<ContentManagement />} />
                <Route path="/number" element={<NumberManagement />} />
                <Route path="/user" element={<UserManagement />} />

                <Route path="/draw" element={<DrawManagement />} />
                <Route path="/draw-history" element={<History />} />
                <Route path="/numbermgmt" element={<NumberStatusAvailability />} />
                <Route path="/audit-logs" element={<CombinedAuditLogViewer />} />
                <Route path="/content/FAQ/AdminFaq" element={<AdminFaq />} />
                <Route path="/content/Testimonals/testimonials" element={<Testimonals />} />
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
