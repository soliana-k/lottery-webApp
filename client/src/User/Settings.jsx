import React, { useState } from 'react'; // Import useState for state management
import './Settings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom'; // Corrected import statement
import Sidebar from './Sidebar.jsx';
import TopNavigationBar from './UserDashboard.jsx';

const Settings = () => {
  // Use location to determine the current path
  const location = useLocation();

  // // State variables for form inputs (if needed)
  // const [theme, setTheme] = useState('light');
  // const [language, setLanguage] = useState('English');
  // const [emailNotifications, setEmailNotifications] = useState(true);

  // const handleThemeChange = (event) => setTheme(event.target.value);
  // const handleLanguageChange = (event) => setLanguage(event.target.value);
  // const handleEmailNotificationsChange = (event) => setEmailNotifications(event.target.checked);

  // Conditional rendering based on the current path
  if (location.pathname === '/settings') {
    return (
      <>
        {/* Sidebar and TopNavigationBar components are included here */}
        <Sidebar />
        <TopNavigationBar />

        <main className="setting-main">
          {/* setting header */}
          <div className="setting-header">
              <h1 className="setting-header-title">Settings</h1>
          </div>

          {/* Settings navigation */}
          <ul className="setting-breadcrumb">
            <li><Link className="setting-breadcrumb-link active" to="/">Account</Link></li>
            <li><Link to="/settings" className="setting-breadcrumb-link">Personalization</Link></li>
            <li><Link to="/settings" className="setting-breadcrumb-link">Notifications</Link></li>
            <li><Link to="/settings" className="setting-breadcrumb-link">Privacy and Security</Link></li>
            <li><Link to="/settings" className="setting-breadcrumb-link">Info</Link></li>
          </ul>

          {/* {Main content for settings} */}
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
                  <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change Password</a>
                  <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
                  <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
                </div>
              </div>

              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-general">
                    <div className="card-body media align-items-center">
                      {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="d-block ui-w-80" />
                      <div className="media-body ml-4">
                        <label className="btn btn-outline-primary">
                          Upload new photo
                          <input type="file" className="account-settings-fileinput" />
                        </label>
                        &nbsp;
                        <button type="button" className="btn btn-default md-btn-flat">Reset</button>
                        <div className="text-light small mt-1">Allowed JPG, GIF, or PNG. Max size of 800K</div>
                      </div> */}
                    {/* </div>
                    <hr className="border-light m-0" />*/}

                    <div className="card-body">
                      <div className="form-group">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control mb-1" value="Feben" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value="Alebachew" />
                      </div>
                      {/*<div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input type="text" className="form-control mb-1" value="nmaxwell@mail.com" />
                        <div className="alert alert-warning mt-3">
                          Your email is not confirmed. Please check your inbox.<br />
                          <a href="javascript:void(0)">Resend confirmation</a>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company</label>
                        <input type="text" className="form-control" value="Company Ltd." />
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="account-change-password">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Repeat New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="account-info">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">Bio</label>
                        <textarea className="form-control" rows="5">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Birthday</label>
                        <input type="text" className="form-control" value="May 3, 1995" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <select className="custom-select">
                          <option>USA</option>
                          <option selected>Canada</option>
                          <option>UK</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>
                    <hr className="border-light m-0" />
                    <div className="card-body pb-2">
                      <h6 className="mb-4">Contacts</h6>
                      <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value="+0 (123) 456 7891" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Website</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="account-notifications">
                    <div className="card-body">
                      <h6 className="mb-4">Activity Notifications</h6>
                      <div className="form-group">
                        <label className="form-label">Email Notifications</label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={emailNotifications}
                          onChange={handleEmailNotificationsChange}
                        />
                      </div>
                      <h6 className="mb-4">System Notifications</h6>
                      <div className="form-group">
                        <label className="form-label">Theme</label>
                        <select className="custom-select" value={theme} onChange={handleThemeChange}>
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Language</label>
                        <select className="custom-select" value={language} onChange={handleLanguageChange}>
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                        </select>*/}
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </main>
      </>
    );
  }

  // Default rendering if not on /settings or /transaction routes
  return (
    <div>
      {/* Add content for other routes if needed */}
      <Sidebar />
      <TopNavigationBar />
    </div>
  );
};

export default Settings;
