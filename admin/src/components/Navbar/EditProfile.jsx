import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAdmin } from '../../redux/authSlice';

const EditProfile = () => {
    const { admin } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: admin.fullname || '',
        email: admin.email || '',
        phoneNumber: admin.phoneNumber || '',
        profilePhoto: admin.profilePhoto || '',
    });

    const [photoPreview, setPhotoPreview] = useState(admin.profilePhoto || '');

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, profilePhoto: file });
        setPhotoPreview(URL.createObjectURL(file));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phoneNumber', input.phoneNumber);
            if (input.profilePhoto instanceof File) {
                formData.append('profilePhoto', input.profilePhoto);
            }

            const res = await axios.put(`http://localhost:8000/api/v1/admin/${admin._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setAdmin(res.data.user));
                alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={submitHandler} className="edit-profile-form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={input.email} onChange={changeEventHandler} />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
                </div>
                <div className="form-group">
                    <label>Profile Photo:</label>
                    <input type="file" name="profilePhoto" onChange={handlePhotoChange} />
                    {photoPreview && <img src={photoPreview} alt="Profile Preview" className="profile-preview" />}
                </div>
                <button type="submit" className="btn-save">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
