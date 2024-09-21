import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { BiUserCircle, BiCamera } from 'react-icons/bi';
import { updateProfilePhoto } from '../../redux/authSlice';
import { setUser } from "../../redux/authSlice"; // Correct import path


const EditProfile = () => {
    const { user } = useSelector((store) => store.auth);  // Changed to user
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState({
        profilePhoto: '', 
        fullname: '',
        email: '',
        phoneNumber: '',
       
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user?._id) { 
                    const response = await axios.get(`http://localhost:8000/api/v1/user/${user._id}`);
                    setUserDetails(response.data);
                    setPreview(`http://localhost:8000/${response.data.profilePhoto}`);
                } else {
                    console.error('User ID not found.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);  
        setPreview(URL.createObjectURL(file)); // Set preview URL for the selected image 
    };

    const handleSave = async (e) => {
        e.preventDefault(); 
    
        const formData = new FormData();
        if (selectedFile) {
            formData.append('profilePhoto', selectedFile); // Append file only if selected
        }
        formData.append('fullname', userDetails.fullname);
        formData.append('email', userDetails.email);
        formData.append('phoneNumber', userDetails.phoneNumber);
    
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/user/${user._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 200) {
                const updatedUser = response.data;
                setUserDetails(updatedUser); // Update local state with new data
                setPreview(`http://localhost:8000/${updatedUser.profilePhoto}`);
                
                // Update the Redux store with the new user data
                dispatch(setUser(updatedUser));
    
                alert('Profile updated successfully');
            } else {
                console.error('Profile update failed:', response.data);
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating profile');
        }
    }

    return (
        <div className='edit-container'>
        <div className="edit-profile-container">
            <h2 className='ed'>Edit Profile</h2>
            <div className="profile-photo-container">
                <label htmlFor="file-input" className="file-input-label">
                    {preview ? (
                        <img 
                            src={preview} 
                            alt="User" 
                            className="profile-photo" 
                        />
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
                    value={userDetails.fullname || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, fullname: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={userDetails.email || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={userDetails.phoneNumber || ''}
                    onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                />
            </div>
          
            <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
        </div>
    );
};

export default EditProfile;
