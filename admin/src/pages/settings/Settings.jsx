import React from 'react';
import { Link } from "react-router-dom";


function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Link className="nav-link" to="/adminRegistration">
                adminRegistration
              </Link>
    </div>
  );
}

export default Settings;