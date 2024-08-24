import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiUserCircle, BiCamera } from 'react-icons/bi';

const EditProfile = () => {
    const { admin } = useSelector((store) => store.auth); 

    const [adminDetails, setAdminDetails] = useState({
        profilePhoto: '', // Default state
        fullname: '',
        email: '',
        phoneNumber: '',
        startDate: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if (admin?._id) { 
                    const response = await axios.get(`http://localhost:8000/api/v1/admin/${admin._id}`);
                    setAdminDetails(response.data);
                } else {
                    console.error('Admin ID not found.');
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            }
        };

        fetchAdminData();
    }, [admin]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        const formData = new FormData();
        if (selectedFile) {
            formData.append('profilePhoto', selectedFile); // Append file only if selected
        }
        formData.append('fullname', adminDetails.fullname);
        formData.append('email', adminDetails.email);
        formData.append('phoneNumber', adminDetails.phoneNumber);
    
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/admin/${admin._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 200) {
                setAdminDetails(response.data); // Update state with response data
                console.log('Profile updated successfully');
            } else {
                console.error('Profile update failed:', response.data);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <div className="profile-photo-container">
                <label htmlFor="file-input" className="file-input-label">
                    {adminDetails.profilePhoto ? (
                        <img src={adminDetails.profilePhoto} alt="Admin" className="profile-photo" />
                    ) : (
                        <BiUserCircle size={120} className="default-photo-icon" />
                    )}
                    <BiCamera size={30} className="camera-icon" onClick={() => document.getElementById('file-input').click()} />
                </label>
                <input
                    type="file"
                    id="file-input"
                    className="file-input"
                    onChange={handleFileChange}
                    style={{ display: 'none' }} // Hide file input
                />
            </div>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={adminDetails.fullname || ''}
                    onChange={(e) => setAdminDetails({ ...adminDetails, fullname: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={adminDetails.email || ''}
                    onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={adminDetails.phoneNumber || ''}
                    onChange={(e) => setAdminDetails({ ...adminDetails, phoneNumber: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Start Date:</label>
                <input
                    type="text"
                    value={adminDetails.startDate || ''}
                    readOnly
                />
            </div>
            <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
    );
};

export default EditProfile;
