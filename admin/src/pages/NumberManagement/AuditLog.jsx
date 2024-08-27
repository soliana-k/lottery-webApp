import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '../../breadcrumb';
import { Container, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const CombinedAuditLogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/v1/logs/audit-logs');
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
    return (
      <Container>
        <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Audit Logs', href: '/audit-logs' }
        ]}
      />
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Audit Logs
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map(log => (
                <TableRow key={log._id}>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell>{log.userId.email}</TableCell>
                  <TableCell>{JSON.stringify(log.details)}</TableCell>
                  <TableCell>{log.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CombinedAuditLogViewer;
