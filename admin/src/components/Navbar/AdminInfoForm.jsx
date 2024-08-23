import React, { useEffect, useState } from 'react';
import './AdminInfoForm.css'; 
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminInfoForm = () => {
    const [adminDetails, setAdminDetails] = useState({});
    const { admin } = useSelector((store) => store.auth); // Get the logged-in admin from Redux

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if (admin?._id) {  // Check if admin is available and has an ID
                    const response = await axios.get(`http://localhost:8000/api/v1/admin/${admin._id}`);
                    setAdminDetails(response.data);
                } else {
                    console.error('Admin ID not found in Redux state.');
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, [admin]);

    return (
        <div className="admin-info-form">
            <h2>Admin Information</h2>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={adminDetails.fullname || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={adminDetails.email || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={adminDetails.phoneNumber || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input type="text" value={adminDetails.startDate || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Photo:</label>
                    {adminDetails.profilePhoto && <img src={adminDetails.profilePhoto} alt="Admin" className="admin-photo" />}
                </div>
            </form>
        </div>
    );
};

export default AdminInfoForm;
