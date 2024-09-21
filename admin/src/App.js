import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from './redux/authSlice';
import Sidebar from './components/sidebar/sidebar'; 
import Navbar from './components/navbar/Navbar';
import AdminInfoForm from './components/navbar/AdminInfoForm';
import EditProfile from './components/navbar/EditProfile';

import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Payment from './pages/payment/Payment';
import Settings from './pages/settings/Settings';
import ManageFAQs from './pages/FAQ/ManageFAQs';
import AddFAQ from './pages/FAQ/AddFAQ';
import ContentManagement from './pages/ContentManagement/ContentManagement';
import UserManagement from './UserManagement';
import Testimonals from './pages/Testimonals/testimonials';
import NumberManagement from './NumberManagement';
import UserList from './UserList';

import AdminSettings from './components/AdminSettings';
import DrawManagement from './draw';
import Prizemanagement from './pages/prizes management/prizes management';
import AddPrizes from './pages/prizes/prizes';
import AdminLogin from './adminLogin';
import AdminRegistration from './adminRegistration';
import History from './pages/NumberManagement/history';
import NumberStatusAvailability from './pages/NumberManagement/NumberStatus';
import NumManagement from './pages/NumberManagement/numManagement';
import Editprizes from './pages/prizes/editprize';
import Edit from './pages/prizes/edit';
import AdminLogs from './pages/ActivityLog/AdminLog';

function App() {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.auth.admin); // Access the admin from Redux store
    const isAuthenticated = !!admin; // Check if the admin is authenticated

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogin = (adminData) => {
        dispatch(setAdmin(adminData)); // Set admin data in the Redux store
    };

    const handleLogout = () => {
        dispatch(setAdmin(null)); // Clear admin data on logout
    };

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {isAuthenticated && (
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        onLogout={handleLogout}
                        style={{ width: isSidebarOpen ? '250px' : '0px' }}
                    />
                )}
                <div
                    style={{
                        flex: 1,
                        marginLeft: isAuthenticated ? (isSidebarOpen ? '250px' : '60px') : '0px',
                    }}
                >
                    {isAuthenticated && <Navbar toggleSidebar={toggleSidebar} onLogout={handleLogout} />}
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
                                <Route path="/payment" element={<Payment />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/adminRegistration" element={<AdminRegistration />} />
                                <Route path="/content" element={<ContentManagement />} />
                                <Route path="/number" element={<NumberManagement />} />
                                <Route path="/user" element={<UserManagement />} />
                                <Route path="/prizes" element={<Prizemanagement />} />
                                <Route path="/admin-info" element={<AdminInfoForm />} />
                                <Route path="/edit-profile" element={<EditProfile />} />
                                <Route path="/draw" element={<DrawManagement />} />
                                <Route path="/user-list" element={<UserList />} />
                                <Route path="/draw-history" element={<History />} />
                                <Route path="/numbermgmt" element={<NumberStatusAvailability />} />
                                <Route path="/num" element={<NumManagement />} />
                                <Route path="/content/FAQ/AddFAQ" element={<AddFAQ />} />
                                <Route path="/content/FAQ/ManageFAQs" element={<ManageFAQs />} />
                                <Route path="/content/Testimonals/testimonials" element={<Testimonals />} />
                                <Route path="/content/AdminSettings" element={<AdminSettings />} />                   
                                <Route path="/prizes/prizes" element={<AddPrizes />} />
                                <Route path="/prizes/editprize" element={<Editprizes />} />
                                <Route path="/prizes/edit" element={<Edit />} />
                                <Route path="/activities" element={<AdminLogs />} />

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
