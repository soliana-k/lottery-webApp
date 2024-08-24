import React, { useEffect, useState } from 'react';
import './EditProfile.css'; 
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiCamera } from 'react-icons/bi';

const EditProfile = () => {
    const [adminDetails, setAdminDetails] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        startDate: '',
        profilePhoto: '',
    });
    const { admin } = useSelector((store) => store.auth); // Get the logged-in admin from Redux
    const [selectedFile, setSelectedFile] = useState(null); // State to hold the selected profile photo

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                if (admin?._id) {  
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

    const handleInputChange = (e) => {
        setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', adminDetails.fullname);
        formData.append('email', adminDetails.email);
        formData.append('phoneNumber', adminDetails.phoneNumber);
        formData.append('startDate', adminDetails.startDate);
        if (selectedFile) {
            formData.append('profilePhoto', selectedFile);
        }

        try {
            await axios.put(`http://localhost:8000/api/v1/admin/${admin._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="profile-photo-container">
                    <img
                        src={
                            selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : adminDetails.profilePhoto || '/default-photo.jpg'
                        }
                        alt="Profile"
                        className="admin-photo"
                    />
                    <label htmlFor="profilePhotoInput" className="photo-changer-icon">
                        <BiCamera size={24} />
                    </label>
                    <input
                        type="file"
                        id="profilePhotoInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="fullname"
                        value={adminDetails.fullname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={adminDetails.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={adminDetails.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input
                        type="text"
                        name="startDate"
                        value={adminDetails.startDate}
                        onChange={handleInputChange}
                        readOnly // Assuming this is not editable
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
