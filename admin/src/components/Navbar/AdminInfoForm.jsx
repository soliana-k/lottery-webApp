import React, { useEffect, useState } from 'react';
import './AdminInfoForm.css'; 
import axios from 'axios';

const AdminInfoForm = () => {
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/admin/');
                if (response.data && response.data.length > 0) {
                    setAdmin(response.data[0]); // Assume you want to display the first admin
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div className="admin-info-form">
            <h2>Admin Information</h2>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" value={admin.fullname || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={admin.email || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" value={admin.phoneNumber || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input type="text" value={admin.startDate || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Photo:</label>
                    {admin.profilePhoto && <img src={admin.profilePhoto} alt="Admin" className="admin-photo" />}
                </div>
            </form>
        </div>
    );
};

export default AdminInfoForm;
