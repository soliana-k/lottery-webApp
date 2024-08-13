// CombinedAuditLogViewer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '../../breadcrumb';
import { Table, Spinner } from 'react-bootstrap';
//import './CombinedAuditLogViewer.css';

const CombinedAuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/audit-logs');
        setLogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="combined-audit-log-viewer">
         <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Audit Logs', href: '/audit-logs' }
        ]}
      />
      <h2>Audit Logs</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Event Type</th>
            <th>User ID</th>
            <th>Details</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.eventType}</td>
              <td>{log.userId}</td>
              <td>{JSON.stringify(log.details)}</td>
              <td>{log.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CombinedAuditLogViewer;
