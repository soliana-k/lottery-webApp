import React, { useState } from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNavigationBar from './UserDashboard.jsx';

const Settings = () => {
  // const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [recoveryEmail, setRecoveryEmail] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert('Password changed successfully');
    } else {
      alert('Passwords do not match');
    }
  };


  return (
    <>
      <Sidebar />
      <TopNavigationBar />

      <main className="setting-main">
        <div className="setting-header">
          <h1 className="setting-header-title">Settings</h1>
        </div>

          <div className="card combination">

          <div className="card-body">
            <h5>Change Password</h5>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary settings-btn">
                Change Password
              </button>
            </form>
            <hr />

          
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
