// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import Breadcrumbs from '../../breadcrumb';
// import axios from 'axios';

// const History = () => {
//   const [key, setKey] = useState('draws');
//   const [pastDraws, setPastDraws] = useState([]);
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const drawsResponse = await axios.get('http://localhost:8000/api/v1/draws');
//         setPastDraws(drawsResponse.data);

//         const logsResponse = await axios.get('http://localhost:8000/api/v1/logs/audit-logs');
//         setLogs(logsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Container>
//       <Breadcrumbs 
//         items={[
//           { label: 'Home', href: '/home' },
//           { label: 'Number Management', href: '/number' },
//           { label: 'Draw Management', href: '/draw' },
//           { label: 'History', href: '/history' }
//         ]}
//       />
//       <Grid container spacing={4} className="my-4">
//         <Grid item xs={12}>
//         <Typography variant="h5" gutterBottom>
//               Draws Ledger
//             </Typography>
//             <Typography variant="body1" color="textSecondary" paragraph>
//               Review Historical Draws and Logs in Detail
//             </Typography>
//           <Paper elevation={3}>
//             <Tabs
//               value={key}
//               onChange={(event, newValue) => setKey(newValue)}
//               indicatorColor="primary"
//               textColor="primary"
//               centered
//               sx={{
//                 '& .MuiTab-root': {
//                   '&:hover': {
//                     backgroundColor: 'transparent', // Disable hover background color
//                   },
//                 },
//               }}
//             >
//               <Tab label="Past Draws" value="draws" />
//               <Tab label="Logs" value="logs" />
//             </Tabs>
//             <TabPanel value={key} index="draws">
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Date</TableCell>
//                       <TableCell>Time</TableCell>
//                       <TableCell>Winner</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {pastDraws.map((draw) => (
//                       <TableRow key={draw._id}>
//                         <TableCell>{draw._id}</TableCell>
//                         <TableCell>{new Date(draw.date).toLocaleDateString()}</TableCell>
//                         <TableCell>{draw.time}</TableCell>
//                         <TableCell>{draw.winner ? draw.winner.name : 'N/A'}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </TabPanel>
//             <TabPanel value={key} index="logs">
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>ID</TableCell>
//                       <TableCell>Action</TableCell>
//                       <TableCell>Timestamp</TableCell>
//                       <TableCell>Details</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {logs.map((log) => (
//                       <TableRow key={log._id}>
//                         <TableCell>{log._id}</TableCell>
//                         <TableCell>{log.action}</TableCell>
//                         <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
//                         <TableCell>{log.details}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </TabPanel>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Grid container>
//           {children}
//         </Grid>
//       )}
//     </div>
//   );
// }

// export default History;
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Tabs, Tab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios';

const History = () => {
  const [key, setKey] = useState('draws');
  const [pastDraws, setPastDraws] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drawsResponse = await axios.get('http://localhost:8000/api/v1/draws');
        setPastDraws(drawsResponse.data);

        const logsResponse = await axios.get('http://localhost:8000/api/v1/logs/audit-logs');
        setLogs(logsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDetails = (details) => {
    return Object.entries(details).map(([key, value]) => (
      <div key={key}>
        <strong>{key}:</strong> {value}
      </div>
    ));
  };

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
                    backgroundColor: 'transparent', // Disable hover background color
                  },
                },
              }}
            >
              <Tab label="Past Draws" value="draws" />
              <Tab label="Logs" value="logs" />
            </Tabs>
            <TabPanel value={key} index="draws">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Winner</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pastDraws.map((draw) => (
                      <TableRow key={draw._id}>
                        <TableCell>{draw._id}</TableCell>
                        <TableCell>{new Date(draw.date).toLocaleDateString()}</TableCell>
                        <TableCell>{draw.time}</TableCell>
                        <TableCell>{draw.winner ? draw.winner.name : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={key} index="logs">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Details</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log._id}>
                        <TableCell>{log.category}</TableCell>
                        <TableCell>{log.eventType}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          {formatDetails(log.details)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container>
          {children}
        </Grid>
      )}
    </div>
  );
}

export default History;



