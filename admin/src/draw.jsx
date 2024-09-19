// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Breadcrumbs from './breadcrumb';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';

// const DrawManagement = () => {
//   const [showCreateDraw, setShowCreateDraw] = useState(false);
//   const [showEditDraw, setShowEditDraw] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [draws, setDraws] = useState([]);
//   const [drawDate, setDrawDate] = useState('');
//   const [drawTime, setDrawTime] = useState('');
//   const [drawStatus, setDrawStatus] = useState('Upcoming');
//   const [editingDraw, setEditingDraw] = useState(null);
//   const [deletingDrawId, setDeletingDrawId] = useState(null);
//   const [originalDrawDate, setOriginalDrawDate] = useState('');

//   useEffect(() => {
//     const fetchDraws = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/draws');
//         setDraws(response.data);
//       } catch (error) {
//         console.error('Error fetching draws:', error);
//       }
//     };

//     fetchDraws();
//   }, []);

//   const handleShowCreate = () => setShowCreateDraw(true);
//   const handleCloseCreate = () => {
//     setShowCreateDraw(false);
//     resetFormFields();
//   };

//   const handleShowEdit = (draw) => {
//     setEditingDraw(draw);
//     setDrawDate(formatDateForInput(draw.date));
//     setDrawTime(draw.time);
//     setDrawStatus(draw.status);
//     setOriginalDrawDate(formatDateForInput(draw.date));
//     setShowEditDraw(true);
//   };

//   const handleCloseEdit = () => {
//     setShowEditDraw(false);
//     resetFormFields();
//   };

//   const handleShowDeleteConfirm = (drawId) => {
//     setDeletingDrawId(drawId);
//     setShowDeleteConfirm(true);
//   };

//   const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

//   const resetFormFields = () => {
//     setDrawDate('');
//     setDrawTime('');
//     setDrawStatus('Upcoming');
//   };

//   const handleCreateSubmit = async () => {
//     try {
//       const data = {
//         date: drawDate,
//         time: drawTime,
//         status: 'Upcoming',
//       };
//       const response = await axios.post('http://localhost:8000/api/v1/draws/create', data);
//       setDraws([...draws, response.data]);
//       handleCloseCreate();
//     } catch (error) {
//       console.error('Error creating draw:', error.response ? error.response.data : error.message);
//     }
//   };

//   const combineDateAndTime = (date, time) => {
//     return new Date(`${date}T${time}`).toISOString();
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const updatedDraw = {
//         date: combineDateAndTime(drawDate, drawTime),
//         time: drawTime,
//         status: drawStatus,
//       };
//       await axios.put(`http://localhost:8000/api/v1/draws/${editingDraw._id}`, updatedDraw);
//       const updatedDraws = draws.map(draw =>
//         draw._id === editingDraw._id
//           ? { ...draw, ...updatedDraw }
//           : draw
//       );
//       setDraws(updatedDraws);
//       handleCloseEdit();
//     } catch (error) {
//       console.error('Error editing draw:', error);
//     }
//   };

//   const handleDelete = async (draw) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/v1/draws/delete/${draw}`);
  
//       // Correctly filter out the deleted draw by comparing the draw's _id with drawId
//       setDraws(draws.filter(draw => draw._id !== draw));
  
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.error('Error deleting draw:', error);
//     }
//   };
  

//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (`0${date.getMonth() + 1}`).slice(-2);
//     const day = (`0${date.getDate()}`).slice(-2);
//     return `${year}-${month}-${day}`;
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Breadcrumbs
//         items={[
//           { label: 'Home', href: '/home' },
//           { label: 'Number Management', href: '/number' },
//           { label: 'Draw Management', href: '/draw' }
//         ]}
//       />
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12}>
//           <Typography variant="h4" gutterBottom>
//             Draw Management Dashboard
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleShowCreate}
//             color="primary"
//           >
//             Create New Draw
//           </Button>
//         </Grid>
//         <Grid item xs={6} sx={{ textAlign: 'right' }}>
//           <Link to="/draw-history">
//             <Button variant="outlined">View History</Button>
//           </Link>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {draws.map((draw) => (
//               <TableRow key={draw._id}>
//                 <TableCell>{draw._id}</TableCell>
//                 <TableCell>{formatDateForInput(draw.date)}</TableCell>
//                 <TableCell>{draw.time}</TableCell>
//                 <TableCell>{draw.status}</TableCell>
//              <TableCell align="center">
//   <IconButton
//     onClick={() => handleShowEdit(draw)}
//     color="primary"
//     style={{ padding: '2px' }} // Adjust padding as needed
//   >
//     <EditIcon fontSize="small" />
//   </IconButton>
//   <IconButton
//     onClick={() => handleShowDeleteConfirm(draw._id)}
//     color="secondary"
//     style={{ padding: '2px' }} // Adjust padding as needed
//   >
//     <DeleteIcon fontSize="small" />
//   </IconButton>
// </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Create Draw Dialog */}
//       <Dialog open={showCreateDraw} onClose={handleCloseCreate}>
//         <DialogTitle>Create New Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//     margin="dense"
//     label="Status"
//     fullWidth
//     value="Upcoming"
//     variant="outlined"
//     InputLabelProps={{ shrink: true }}
//     disabled
//   />

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreate} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateSubmit} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Draw Dialog */}
//       <Dialog open={showEditDraw} onClose={handleCloseEdit}>
//         <DialogTitle>Edit Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Status"
//             select
//             fullWidth
//             value={drawStatus}
//             onChange={(e) => setDrawStatus(e.target.value)}
//             variant="outlined"
//           >
//             <MenuItem value="Upcoming">Upcoming</MenuItem>
//             <MenuItem value="Cancelled">Cancelled</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEdit} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSubmit} color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this draw?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteConfirm} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleDelete(deletingDrawId)} color="primary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DrawManagement;
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Breadcrumbs from './breadcrumb';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAdmin } from '../src/redux/selectors.js';
// import { setAdmin } from '../src/redux/authSlice.js';

// const DrawManagement = () => {
//   const dispatch = useDispatch();
//   const admin = useSelector(selectAdmin);

//   const [showCreateDraw, setShowCreateDraw] = useState(false);
//   const [showEditDraw, setShowEditDraw] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [draws, setDraws] = useState([]);
//   const [drawDate, setDrawDate] = useState('');
//   const [drawTime, setDrawTime] = useState('');
//   const [drawStatus, setDrawStatus] = useState('Upcoming');
//   const [editingDraw, setEditingDraw] = useState(null);
//   const [deletingDrawId, setDeletingDrawId] = useState(null);
//   const [originalDrawDate, setOriginalDrawDate] = useState('');

//   useEffect(() => {
//     const fetchDraws = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/draws');
//         setDraws(response.data);
//       } catch (error) {
//         console.error('Error fetching draws:', error);
//       }
//     };

//     fetchDraws();
//   }, []);

//   const handleShowCreate = () => setShowCreateDraw(true);
//   const handleCloseCreate = () => {
//     setShowCreateDraw(false);
//     resetFormFields();
//   };

//   const handleShowEdit = (draw) => {
//     setEditingDraw(draw);
//     setDrawDate(formatDateForInput(draw.date));
//     setDrawTime(draw.time);
//     setDrawStatus(draw.status);
//     setOriginalDrawDate(formatDateForInput(draw.date));
//     setShowEditDraw(true);
//   };

//   const handleCloseEdit = () => {
//     setShowEditDraw(false);
//     resetFormFields();
//   };

//   const handleShowDeleteConfirm = (drawId) => {
//     setDeletingDrawId(drawId);
//     setShowDeleteConfirm(true);
//   };

//   const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

//   const resetFormFields = () => {
//     setDrawDate('');
//     setDrawTime('');
//     setDrawStatus('Upcoming');
//   };
//   const user = useSelector((state) => state.auth.admin);
//   const handleCreateSubmit = async () => {
//     try {
//       const data = {
//         date: drawDate,
//         time: drawTime,
//         status: 'Upcoming',
//         email: user?.email, // Send admin email
//       };
//       const response = await axios.post('http://localhost:8000/api/v1/draws/create', data);
//       setDraws([...draws, response.data]);
//       handleCloseCreate();
//     } catch (error) {
//       console.error('Error creating draw:', error.response ? error.response.data : error.message);
//     }
//   };

//   const combineDateAndTime = (date, time) => {
//     return new Date(`${date}T${time}`).toISOString();
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const updatedDraw = {
//         date: combineDateAndTime(drawDate, drawTime),
//         time: drawTime,
//         status: drawStatus,
//         adminEmail: admin.email, // Send admin email
//       };
//       await axios.put(`http://localhost:8000/api/v1/draws/${editingDraw._id}`, updatedDraw);
//       const updatedDraws = draws.map(draw =>
//         draw._id === editingDraw._id
//           ? { ...draw, ...updatedDraw }
//           : draw
//       );
//       setDraws(updatedDraws);
//       handleCloseEdit();
//     } catch (error) {
//       console.error('Error editing draw:', error);
//     }
//   };

//   const handleDelete = async (draw) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/v1/draws/delete/${draw}`);
//       setDraws(draws.filter(draw => draw._id !== draw));
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.error('Error deleting draw:', error);
//     }
//   };

//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (`0${date.getMonth() + 1}`).slice(-2);
//     const day = (`0${date.getDate()}`).slice(-2);
//     return `${year}-${month}-${day}`;
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Breadcrumbs
//         items={[
//           { label: 'Home', href: '/home' },
//           { label: 'Number Management', href: '/number' },
//           { label: 'Draw Management', href: '/draw' }
//         ]}
//       />
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12}>
//           <Typography variant="h4" gutterBottom>
//             Draw Management Dashboard
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleShowCreate}
//             color="primary"
//           >
//             Create New Draw
//           </Button>
//         </Grid>
//         <Grid item xs={6} sx={{ textAlign: 'right' }}>
//           <Link to="/draw-history">
//             <Button variant="outlined">View History</Button>
//           </Link>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {draws.map((draw) => (
//               <TableRow key={draw._id}>
//                 <TableCell>{draw._id}</TableCell>
//                 <TableCell>{formatDateForInput(draw.date)}</TableCell>
//                 <TableCell>{draw.time}</TableCell>
//                 <TableCell>{draw.status}</TableCell>
//                 <TableCell align="center">
//                   <IconButton
//                     onClick={() => handleShowEdit(draw)}
//                     color="primary"
//                     style={{ padding: '2px' }} // Adjust padding as needed
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleShowDeleteConfirm(draw._id)}
//                     color="secondary"
//                     style={{ padding: '2px' }} // Adjust padding as needed
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Create Draw Dialog */}
//       <Dialog open={showCreateDraw} onClose={handleCloseCreate}>
//         <DialogTitle>Create New Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Status"
//             fullWidth
//             value="Upcoming"
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//             disabled
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreate} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateSubmit} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Draw Dialog */}
//       <Dialog open={showEditDraw} onClose={handleCloseEdit}>
//         <DialogTitle>Edit Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Status"
//             select
//             fullWidth
//             value={drawStatus}
//             onChange={(e) => setDrawStatus(e.target.value)}
//             variant="outlined"
//           >
//             <MenuItem value="Upcoming">Upcoming</MenuItem>
//             <MenuItem value="Cancelled">Cancelled</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEdit} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSubmit} color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this draw?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteConfirm} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleDelete(deletingDrawId)} color="primary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DrawManagement;
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   MenuItem,
//   Typography,
//   IconButton,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Breadcrumbs from './breadcrumb';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectAdmin } from '../src/redux/selectors.js';

// const DrawManagement = () => {
//   const dispatch = useDispatch();
//   const admin = useSelector(selectAdmin);

//   const [showCreateDraw, setShowCreateDraw] = useState(false);
//   const [showEditDraw, setShowEditDraw] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [draws, setDraws] = useState([]);
//   const [drawDate, setDrawDate] = useState('');
//   const [drawTime, setDrawTime] = useState('');
//   const [drawStatus, setDrawStatus] = useState('Upcoming');
//   const [editingDraw, setEditingDraw] = useState(null);
//   const [deletingDrawId, setDeletingDrawId] = useState(null);

//   useEffect(() => {
//     const fetchDraws = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/draws');
//         setDraws(response.data);
//       } catch (error) {
//         console.error('Error fetching draws:', error);
//       }
//     };

//     fetchDraws();
//   }, []);

//   const handleShowCreate = () => setShowCreateDraw(true);
//   const handleCloseCreate = () => {
//     setShowCreateDraw(false);
//     resetFormFields();
//   };

//   const handleShowEdit = (draw) => {
//     setEditingDraw(draw);
//     setDrawDate(formatDateForInput(draw.date));
//     setDrawTime(draw.time);
//     setDrawStatus(draw.status);
//     setShowEditDraw(true);
//   };

//   const handleCloseEdit = () => {
//     setShowEditDraw(false);
//     resetFormFields();
//   };

//   const handleShowDeleteConfirm = (drawId) => {
//     setDeletingDrawId(drawId);
//     setShowDeleteConfirm(true);
//   };

//   const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

//   const resetFormFields = () => {
//     setDrawDate('');
//     setDrawTime('');
//     setDrawStatus('Upcoming');
//   };

//   const user = useSelector((state) => state.auth.admin);

//   const handleCreateSubmit = async () => {
//     try {
//       const data = {
//         date: drawDate,
//         time: drawTime,
//         status: 'Upcoming',
//         email: user?.email,
//       };
      
//       const response = await axios.post('http://localhost:8000/api/v1/draws/create', data);
      
//       // Assuming response.data is now the new draw object directly
//       const newDraw = response.data;
  
//       // Add the new draw to the state
//       setDraws((prevDraws) => [...prevDraws, newDraw]);
  
//       handleCloseCreate();
//     } catch (error) {
//       console.error('Error creating draw:', error.response ? error.response.data : error.message);
//     }
//   };
  

//   const combineDateAndTime = (date, time) => {
//     return new Date(`${date}T${time}`).toISOString();
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const updatedDraw = {
//         date: combineDateAndTime(drawDate, drawTime),
//         time: drawTime,
//         status: drawStatus,
//         adminEmail: admin.email, // Send admin email
//       };

//       await axios.put(`http://localhost:8000/api/v1/draws/${editingDraw._id}`, updatedDraw);

//       // Update the state with the edited draw
//       const updatedDraws = draws.map((draw) =>
//         draw._id === editingDraw._id ? { ...draw, ...updatedDraw } : draw
//       );

//       setDraws(updatedDraws);
//       handleCloseEdit();
//     } catch (error) {
//       console.error('Error editing draw:', error);
//     }
//   };

//   const handleDelete = async (drawId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/v1/draws/delete/${drawId}`);
//       setDraws(draws.filter((draw) => draw._id !== drawId));
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.error('Error deleting draw:', error);
//     }
//   };

//   const formatDateForInput = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = (`0${date.getMonth() + 1}`).slice(-2);
//     const day = (`0${date.getDate()}`).slice(-2);
//     return `${year}-${month}-${day}`;
//   };

//   return (
//     <Box sx={{ p: 4 }}>
//       <Breadcrumbs
//         items={[
//           { label: 'Home', href: '/home' },
//           { label: 'Number Management', href: '/number' },
//           { label: 'Draw Management', href: '/draw' },
//         ]}
//       />
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12}>
//           <Typography variant="h4" gutterBottom>
//             Draw Management Dashboard
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleShowCreate}
//             color="primary"
//           >
//             Create New Draw
//           </Button>
//         </Grid>
//         <Grid item xs={6} sx={{ textAlign: 'right' }}>
//           <Link to="/draw-history">
//             <Button variant="outlined">View History</Button>
//           </Link>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Time</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {draws.map((draw) => (
//               <TableRow key={draw._id}>
//                 <TableCell>{draw._id}</TableCell>
//                 <TableCell>{formatDateForInput(draw.date)}</TableCell>
//                 <TableCell>{draw.time}</TableCell>
//                 <TableCell>{draw.status}</TableCell>
//                 <TableCell align="center">
//                   <IconButton
//                     onClick={() => handleShowEdit(draw)}
//                     color="primary"
//                     style={{ padding: '2px' }}
//                   >
//                     <EditIcon fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleShowDeleteConfirm(draw._id)}
//                     color="secondary"
//                     style={{ padding: '2px' }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Create Draw Dialog */}
//       <Dialog open={showCreateDraw} onClose={handleCloseCreate}>
//         <DialogTitle>Create New Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Status"
//             select
//             fullWidth
//             value={drawStatus}
//             onChange={(e) => setDrawStatus(e.target.value)}
//             variant="outlined"
//           >
//             <MenuItem value="Upcoming">Upcoming</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//             <MenuItem value="Canceled">Canceled</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreate} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateSubmit} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Draw Dialog */}
//       <Dialog open={showEditDraw} onClose={handleCloseEdit}>
//         <DialogTitle>Edit Draw</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Date"
//             type="date"
//             fullWidth
//             value={drawDate}
//             onChange={(e) => setDrawDate(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Time"
//             type="time"
//             fullWidth
//             value={drawTime}
//             onChange={(e) => setDrawTime(e.target.value)}
//             variant="outlined"
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             margin="dense"
//             label="Status"
//             select
//             fullWidth
//             value={drawStatus}
//             onChange={(e) => setDrawStatus(e.target.value)}
//             variant="outlined"
//           >
//             <MenuItem value="Upcoming">Upcoming</MenuItem>
//             <MenuItem value="Completed">Completed</MenuItem>
//             <MenuItem value="Canceled">Canceled</MenuItem>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEdit} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleEditSubmit} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirm Dialog */}
//       <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
//         <DialogTitle>Delete Draw</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this draw?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDeleteConfirm} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleDelete(deletingDrawId)} color="primary">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default DrawManagement;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Select,
  InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from './breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectAdmin } from '../src/redux/selectors.js';

const DrawManagement = () => {
  const dispatch = useDispatch();
  const admin = useSelector(selectAdmin);

  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [showEditDraw, setShowEditDraw] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draws, setDraws] = useState([]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawStatus, setDrawStatus] = useState('Upcoming');
  const [drawPrize, setDrawPrize] = useState('');
  const [prizes, setPrizes] = useState([]);
  const [editingDraw, setEditingDraw] = useState(null);
  const [deletingDrawId, setDeletingDrawId] = useState(null);

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/draws');
        setDraws(response.data);
      } catch (error) {
        console.error('Error fetching draws:', error);
      }
    };

    const fetchPrizes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/prizes');
        setPrizes(response.data);
      } catch (error) {
        console.error('Error fetching prizes:', error);
      }
    };

    fetchDraws();
    fetchPrizes();
  }, []);

  const handleShowCreate = () => setShowCreateDraw(true);
  const handleCloseCreate = () => {
    setShowCreateDraw(false);
    resetFormFields();
  };

  const handleShowEdit = (draw) => {
    setEditingDraw(draw);
    setDrawDate(formatDateForInput(draw.date));
    setDrawTime(draw.time);
    setDrawStatus(draw.status);
    setDrawPrize(draw.prize || '');
    setShowEditDraw(true);
  };

  const handleCloseEdit = () => {
    setShowEditDraw(false);
    resetFormFields();
  };

  const handleShowDeleteConfirm = (drawId) => {
    setDeletingDrawId(drawId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const resetFormFields = () => {
    setDrawDate('');
    setDrawTime('');
    setDrawStatus('Upcoming');
    setDrawPrize('');
  };

  const handleCreateSubmit = async () => {
    try {
      const data = {
        date: combineDateAndTime(drawDate, drawTime),
        time: drawTime,
        status: drawStatus,
        prize: drawPrize,
        email: admin?.email,
      };

      const response = await axios.post('http://localhost:8000/api/v1/draws/create', data);
      setDraws((prevDraws) => [...prevDraws, response.data.draw]);
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating draw:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const updatedDraw = {
        date: combineDateAndTime(drawDate, drawTime),
        time: drawTime,
        status: drawStatus,
        prize: drawPrize,
        adminEmail: admin.email,
      };

      await axios.put(`http://localhost:8000/api/v1/draws/${editingDraw._id}`, updatedDraw);

      setDraws((prevDraws) =>
        prevDraws.map((draw) =>
          draw._id === editingDraw._id ? { ...draw, ...updatedDraw } : draw
        )
      );

      handleCloseEdit();
    } catch (error) {
      console.error('Error editing draw:', error);
    }
  };

  const handleDelete = async (drawId) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/draws/delete/${drawId}`);
      setDraws((prevDraws) => prevDraws.filter((draw) => draw._id !== drawId));
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error('Error deleting draw:', error);
    }
  };

  const combineDateAndTime = (date, time) => {
    return new Date(`${date}T${time}`).toISOString();
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const getPrizeNameById = (id) => {
    const prize = prizes.find((prize) => prize._id === id);
    return prize ? prize.name : 'Unknown';
  };

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number' },
          { label: 'Draw Management', href: '/draw' },
        ]}
      />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Draw Management Dashboard
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleShowCreate}
            color="primary"
          >
            Create New Draw
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Link to="/draw-history">
            <Button variant="outlined">View History</Button>
          </Link>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Prize</TableCell> {/* Prize Column */}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draws.map((draw) => (
              <TableRow key={draw._id}>
                <TableCell>{draw._id}</TableCell>
                <TableCell>{formatDateForInput(draw.date)}</TableCell>
                <TableCell>{draw.time}</TableCell>
                <TableCell>{draw.status}</TableCell>
                <TableCell>{getPrizeNameById(draw.prize)}</TableCell> {/* Display Prize Name */}
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleShowEdit(draw)}
                    color="primary"
                    style={{ padding: '2px' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleShowDeleteConfirm(draw._id)}
                    color="secondary"
                    style={{ padding: '2px' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Draw Dialog */}
      <Dialog open={showCreateDraw} onClose={handleCloseCreate}>
        <DialogTitle>Create New Draw</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={drawDate}
            onChange={(e) => setDrawDate(e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            value={drawTime}
            onChange={(e) => setDrawTime(e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <InputLabel>Status</InputLabel>
          <Select
            fullWidth
            value={drawStatus}
            onChange={(e) => setDrawStatus(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <InputLabel>Prize</InputLabel>
          <Select
            fullWidth
            value={drawPrize}
            onChange={(e) => setDrawPrize(e.target.value)}
            variant="outlined"
          >
            {prizes.map((prize) => (
              <MenuItem key={prize._id} value={prize._id}>
                {prize.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Draw Dialog */}
      <Dialog open={showEditDraw} onClose={handleCloseEdit}>
        <DialogTitle>Edit Draw</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={drawDate}
            onChange={(e) => setDrawDate(e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Time"
            type="time"
            fullWidth
            value={drawTime}
            onChange={(e) => setDrawTime(e.target.value)}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <InputLabel>Status</InputLabel>
          <Select
            fullWidth
            value={drawStatus}
            onChange={(e) => setDrawStatus(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <InputLabel>Prize</InputLabel>
          <Select
            fullWidth
            value={drawPrize}
            onChange={(e) => setDrawPrize(e.target.value)}
            variant="outlined"
          >
            {prizes.map((prize) => (
              <MenuItem key={prize._id} value={prize._id}>
                {prize.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this draw?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deletingDrawId);
              handleCloseDeleteConfirm();
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DrawManagement;








