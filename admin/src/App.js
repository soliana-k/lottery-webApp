// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Sidebar from './components/sidebar/sidebar';
import Navbar from './components/Navbar/Navbar';
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

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect root to /home */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/numbers" element={<NumberManagement/>} />
            <Route path="/content/FAQ/AdminFaq" element={<AdminFaq />} />
            <Route path="/content/Testimonals/testimonials" element={<Testimonals />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
