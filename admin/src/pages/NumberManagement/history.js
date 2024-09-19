
import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination, TableSortLabel
} from '@mui/material';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';

const History = () => {
  const [key, setKey] = useState('draws');
  const [pastDraws, setPastDraws] = useState([]);
  const [logs, setLogs] = useState([]);
  const [drawPage, setDrawPage] = useState(0);
  const [drawRowsPerPage, setDrawRowsPerPage] = useState(10);
  const [logPage, setLogPage] = useState(0);
  const [logRowsPerPage, setLogRowsPerPage] = useState(10);
  const [drawSortDirection, setDrawSortDirection] = useState('asc');
  const [drawOrderBy, setDrawOrderBy] = useState('date');
  const [logSortDirection, setLogSortDirection] = useState('asc');
  const [logOrderBy, setLogOrderBy] = useState('timestamp');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drawsResponse = await axios.get('http://localhost:8000/api/v1/draws/history');
        setPastDraws(drawsResponse.data);

        const logsResponse = await axios.get('http://localhost:8000/api/v1/logs/audit-logs');
        setLogs(logsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDrawChangePage = (event, newPage) => {
    setDrawPage(newPage);
  };

  const handleDrawChangeRowsPerPage = (event) => {
    setDrawRowsPerPage(parseInt(event.target.value, 10));
    setDrawPage(0);
  };

  const handleLogChangePage = (event, newPage) => {
    setLogPage(newPage);
  };

  const handleLogChangeRowsPerPage = (event) => {
    setLogRowsPerPage(parseInt(event.target.value, 10));
    setLogPage(0);
  };

  const handleDrawSort = (property) => {
    const isAscending = drawOrderBy === property && drawSortDirection === 'asc';
    setDrawSortDirection(isAscending ? 'desc' : 'asc');
    setDrawOrderBy(property);
  };

  const handleLogSort = (property) => {
    const isAscending = logOrderBy === property && logSortDirection === 'asc';
    setLogSortDirection(isAscending ? 'desc' : 'asc');
    setLogOrderBy(property);
  };

  const sortedPastDraws = pastDraws.sort((a, b) => {
    if (drawOrderBy === 'date') {
      return (new Date(a.date) - new Date(b.date)) * (drawSortDirection === 'asc' ? 1 : -1);
    } else {
      return (a[drawOrderBy] > b[drawOrderBy] ? 1 : -1) * (drawSortDirection === 'asc' ? 1 : -1);
    }
  });

  const sortedLogs = logs.sort((a, b) => {
    if (logOrderBy === 'timestamp') {
      return (new Date(a.timestamp) - new Date(b.timestamp)) * (logSortDirection === 'asc' ? 1 : -1);
    } else {
      return (a[logOrderBy] > b[logOrderBy] ? 1 : -1) * (logSortDirection === 'asc' ? 1 : -1);
    }
  });

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number' },
          { label: 'Draw Management', href: '/draw' },
          { label: 'History', href: '/history' }
        ]}
      />
      <Grid container spacing={4} className="my-4">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Draws Ledger
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Review Historical Draws and Logs in Detail
          </Typography>
          <Paper elevation={3}>
            <Tabs
              value={key}
              onChange={(event, newValue) => setKey(newValue)}
              indicatorColor="primary"
              textColor="primary"
              centered
              sx={{
                '& .MuiTab-root': {
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                },
              }}
            >
              <Tab label="Past Draws" value="draws" />
              <Tab label="Logs" value="logs" />
            </Tabs>
            {key === 'draws' && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sortDirection={drawOrderBy === 'date' ? drawSortDirection : false}>
                        <TableSortLabel
                          active={drawOrderBy === 'date'}
                          direction={drawSortDirection}
                          onClick={() => handleDrawSort('date')}
                        >
                          Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedPastDraws.slice(drawPage * drawRowsPerPage, drawPage * drawRowsPerPage + drawRowsPerPage).map((draw) => (
                      <TableRow key={draw._id}>
                        <TableCell>{new Date(draw.date).toLocaleDateString()}</TableCell>
                        <TableCell>{draw.time}</TableCell>
                        <TableCell>{draw.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={pastDraws.length}
                  rowsPerPage={drawRowsPerPage}
                  page={drawPage}
                  onPageChange={handleDrawChangePage}
                  onRowsPerPageChange={handleDrawChangeRowsPerPage}
                />
              </TableContainer>
            )}
            {key === 'logs' && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sortDirection={logOrderBy === 'timestamp' ? logSortDirection : false}>
                        <TableSortLabel
                          active={logOrderBy === 'timestamp'}
                          direction={logSortDirection}
                          onClick={() => handleLogSort('timestamp')}
                        >
                          Timestamp
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedLogs.slice(logPage * logRowsPerPage, logPage * logRowsPerPage + logRowsPerPage).map((log) => (
                      <TableRow key={log._id}>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{log.category}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.email}</TableCell>
                        <TableCell>
                          {typeof log.details === 'object' && log.details !== null ? (
                            <ul style={{ paddingLeft: '1em', margin: 0 }}>
                              {Object.entries(log.details).map(([key, value]) => (
                                <li key={key}>
                                  <strong>{key}:</strong> {String(value)}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span>{String(log.details)}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={logs.length}
                  rowsPerPage={logRowsPerPage}
                  page={logPage}
                  onPageChange={handleLogChangePage}
                  onRowsPerPageChange={handleLogChangeRowsPerPage}
                />
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default History;



