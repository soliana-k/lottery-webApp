// CombinedAuditLogViewer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '../../breadcrumb';
import { Table, Spinner } from 'react-bootstrap';


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data from the server
        axios.get('http://localhost:3000/api/v1/admin/users') // Adjust the URL if necessary
          .then(response => {
            setUsers(response.data); // Set the user data
            setLoading(false); // Stop loading
          })
          .catch(err => {
            setError(err.message); // Set error if any
            setLoading(false); // Stop loading
          });
      }, []);
    
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error}</p>;
  return (
    <div className="combined-audit-log-viewer">
         {/* <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'User Management', href: '/number/' },
          { label: 'Audit Logs', href: '/audit-logs' }
        ]}
      /> */}
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Prifile Photo</th>
          </tr>
        </thead>
        <tbody>
        {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    {user.profilePhoto ? (
                                        <img
                                            src={`http://localhost:3000/uploads/${user.profilePhoto}`}
                                            alt="Profile"
                                            width="50"
                                        />
                                    ) : (
                                        'No Photo'
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
