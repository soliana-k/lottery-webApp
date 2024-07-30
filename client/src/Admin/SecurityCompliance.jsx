import React from 'react';
import './SecurityCompliance.css';

function SecurityCompliance() {
  return (
    <div className="security-compliance">
      <h2>Security & Compliance</h2>
      <div className="security-content">
        <h3>User Data Protection</h3>
        <p>
          Ensure that all user data is handled securely. Follow best practices for encryption and data storage.
        </p>
        <h3>Compliance with Legal Regulations</h3>
        <p>
          Ensure that the application complies with all relevant laws and regulations, including data protection and privacy laws.
        </p>
        <button>Update Settings</button>
      </div>
    </div>
  );
}

export default SecurityCompliance;
