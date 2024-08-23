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
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from './breadcrumb';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const DrawManagement = () => {
  const [showCreateDraw, setShowCreateDraw] = useState(false);
  const [showEditDraw, setShowEditDraw] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [draws, setDraws] = useState([]);
  const [drawDate, setDrawDate] = useState('');
  const [drawTime, setDrawTime] = useState('');
  const [drawStatus, setDrawStatus] = useState('Upcoming');
  const [editingDraw, setEditingDraw] = useState(null);
  const [deletingDrawId, setDeletingDrawId] = useState(null);
  const [originalDrawDate, setOriginalDrawDate] = useState('');

  useEffect(() => {
    const fetchDraws = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/draws');
        setDraws(response.data);
      } catch (error) {
        console.error('Error fetching draws:', error);
      }
    };

    fetchDraws();
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
    setOriginalDrawDate(formatDateForInput(draw.date));
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
  };

  const handleCreateSubmit = async () => {
    try {
      const data = {
        date: drawDate,
        time: drawTime,
        status: 'Upcoming',
      };
      const response = await axios.post('http://localhost:8000/api/v1/admin/draws/create', data);
      setDraws([...draws, response.data]);
      handleCloseCreate();
    } catch (error) {
      console.error('Error creating draw:', error.response ? error.response.data : error.message);
    }
  };

  const combineDateAndTime = (date, time) => {
    return new Date(`${date}T${time}`).toISOString();
  };

  const handleEditSubmit = async () => {
    try {
      const updatedDraw = {
        date: combineDateAndTime(drawDate, drawTime),
        time: drawTime,
        status: drawStatus,
      };
      await axios.put(`http://localhost:8000/api/v1/admin/draws/${editingDraw._id}`, updatedDraw);
      const updatedDraws = draws.map(draw =>
        draw._id === editingDraw._id
          ? { ...draw, ...updatedDraw }
          : draw
      );
      setDraws(updatedDraws);
      handleCloseEdit();
    } catch (error) {
      console.error('Error editing draw:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/draws/delete/${id}`);
      setDraws(draws.filter(draw => draw._id !== id));
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error('Error deleting draw:', error);
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number' },
          { label: 'Draw Management', href: '/draw' }
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
                <TableCell align="center">
                  <IconButton onClick={() => handleShowEdit(draw)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShowDeleteConfirm(draw._id)} color="secondary">
                    <DeleteIcon />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate} color="secondary">
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
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            value={drawStatus}
            onChange={(e) => setDrawStatus(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Upcoming">Upcoming</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this draw?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deletingDrawId)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DrawManagement;
