import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileInfo.css'; 
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiUserCircle, BiEdit } from 'react-icons/bi'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar.jsx';
import TopNavigationBar from '../UserDashboard.jsx';

const UserInfoForm = () => {
    const [userDetails, setUserDetails] = useState({});
    const { user } = useSelector((store) => store.auth); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user?._id) {  
                    const response = await axios.get(`http://localhost:8000/api/v1/user/${user._id}`);
                    setUserDetails(response.data);
                } else {
                    console.error('User ID not found in Redux state.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    const goToEditProfile = () => {
        navigate('/user-edit-profile');
    };

    return (
        <>
            <TopNavigationBar />
            <Sidebar />
            {/* <Breadcrumbs 
                items={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Profile Information', active: true }
                ]}
            /> */}
            <div className="user-info-form">
                <h2>Profile</h2>
                <div className="edit-icon-container">
                    <BiEdit className="edit-icon" onClick={goToEditProfile} />
                </div>
                <div className="user-photo-container">
                    {userDetails.profilePhoto ? (
                        <img 
                            src={`http://localhost:8000/${userDetails.profilePhoto}`} 
                            alt="User" 
                            className="profile-photo" 
                        />
                    ) : (
                        <BiUserCircle className="default-icon" />
                    )}
                </div>
                <form>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input type="text" value={userDetails.fullname || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={userDetails.email || ''} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="text" value={userDetails.phoneNumber || ''} readOnly />
                    </div>
                    <Link to="/dashboard"><button className="cancel">Cancel</button></Link>
                </form>
            </div>
        </>
    );
};

export default UserInfoForm;
