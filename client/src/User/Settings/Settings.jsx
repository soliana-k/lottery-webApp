import React from 'react';
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar.jsx';
import TopNavigationBar from '../UserDashboard.jsx';

const Settings = () => {
  const location = useLocation();

  return (
    <>
      <Sidebar />
      <TopNavigationBar />

      <main className="setting-main">
        <div className="setting-header">
          <h1 className="setting-header-title">Settings</h1>
        </div>

        <div className="card combination">
          <ul className="setting-breadcrumb">
            <li>
              <Link className={`setting-breadcrumb-link ${location.pathname === '/settings' ? 'active' : ''}`} to="/settings">
                Account
              </Link>
            </li>
            <li>
              <Link className={`setting-breadcrumb-link ${location.pathname === '/settings/personalization' ? 'active' : ''}`} to="/settings/personalization">
                Personalization
              </Link>
            </li>
            <li>
              <Link className={`setting-breadcrumb-link ${location.pathname === '/settings/notifications' ? 'active' : ''}`} to="/settings/notifications">
                Notifications
              </Link>
            </li>
            <li>
              <Link className={`setting-breadcrumb-link ${location.pathname === '/settings/privacy-and-security' ? 'active' : ''}`} to="/settings/privacy-and-security">
                Privacy and Security
              </Link>
            </li>
            <li>
              <Link className={`setting-breadcrumb-link ${location.pathname === '/settings/help' ? 'active' : ''}`} to="/settings/help">
                Help
              </Link>
            </li>
          </ul>
          <hr className="border-top" />

          <div className="card-body">
            {/* Conditional rendering based on the path */}
            {location.pathname === '/settings' && (
              <>
                <div className="profile">
                  <h2>Profile Information</h2>
                  <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="Profile" className="profile-picture" />
                  <div className="media-body ml-4">
                    <label className="btn btn-outline-primary">
                      Upload new photo
                      <input type="file" className="account-settings-fileinput" />
                    </label>
                    &nbsp;
                    <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                    <div className="text-light small mt-1">Allowed JPG, GIF, or PNG. Max size of 800K</div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="form-control mb-1"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <input type="email" className="form-control mb-1" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control mb-1"/>
                    </div>
                  </div>
                  <button>Edit profile</button>
                </div>
                <div className="password">
                  <h2>Change Password</h2>
                  <p>Hello there!</p>
                </div>
                <div className="account">
                  <h2>Account Information</h2>
                  <p>Hey</p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
