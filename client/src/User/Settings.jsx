import React, { useState } from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopNavigationBar from './UserDashboard.jsx';

const Settings = () => {
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      alert('Password changed successfully');
    } else {
      alert('Passwords do not match');
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    alert(`Recovery email set to: ${recoveryEmail}`);
  };

  return (
    <>
      <Sidebar />
      <TopNavigationBar />

      <main className="setting-main">
        <div className="setting-header">
          <h1 className="setting-header-title">Settings</h1>
        </div>

        
          <ul className="setting-breadcrumb">
            <li>
              <Link
                className={`setting-breadcrumb-link ${
                  location.pathname === '/settings' ? 'active' : ''
                }`}
                to="/settings"
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                className={`setting-breadcrumb-link ${
                  location.pathname === '/settings/support' ? 'active' : ''
                }`}
                to="/settings/support"
              >
                Support & Feedback
              </Link>
            </li>
            <li>
              <Link
                className={`setting-breadcrumb-link ${
                  location.pathname === '/settings/terms' ? 'active' : ''
                }`}
                to="/settings/terms"
              >
                Terms & Condition
              </Link>
            </li>
          </ul>
          <div className="card combination">

          <div className="card-body">
            <h3>Change Password</h3>
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

            <h3>Account Recovery</h3>
            <form onSubmit={handleRecoverySubmit}>
              <div className="form-group">
                <label>Recovery Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary settings-btn">
                Set Recovery Email
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
