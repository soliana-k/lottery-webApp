import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import User from './pages/User/Users';
import Payment from './pages/payment/Payment';
import Settings from './pages/settings/Settings';
import Logout from './pages/logout/Logout';
import AdminFaq from './pages/FAQ/AdminFaq';
import ContentManagement from './pages/ContentManagement/ContentManagement';
import Testimonals from './pages/Testimonals/testimonials';
import NumberManagement from './NumberManagement';
import DrawManagement from './draw'; 
import AdminLogin from './adminLogin'; // Import AdminLogin

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
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/adminLogin"} />} />
            <Route path="/adminLogin" element={<AdminLogin onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/adminLogin" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/adminLogin" />} />
            <Route path="/user" element={isAuthenticated ? <User /> : <Navigate to="/adminLogin" />} />
            <Route path="/payment" element={isAuthenticated ? <Payment /> : <Navigate to="/adminLogin" />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/adminLogin" />} />
            <Route path="/logout" element={isAuthenticated ? <Logout /> : <Navigate to="/adminLogin" />} />
            <Route path="/content" element={isAuthenticated ? <ContentManagement /> : <Navigate to="/adminLogin" />} />
            <Route path="/numbers" element={isAuthenticated ? <NumberManagement /> : <Navigate to="/adminLogin" />} />
            <Route path="/draw" element={isAuthenticated ? <DrawManagement /> : <Navigate to="/adminLogin" />} />
            <Route path="/content/FAQ/AdminFaq" element={isAuthenticated ? <AdminFaq /> : <Navigate to="/adminLogin" />} />
            <Route path="/content/Testimonals/testimonials" element={isAuthenticated ? <Testimonals /> : <Navigate to="/adminLogin" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
