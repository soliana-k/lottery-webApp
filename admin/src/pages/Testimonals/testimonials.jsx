import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import Breadcrumbs from '../../breadcrumb'; // Adjust the path if needed

const AdminTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deletingTestimonialId, setDeletingTestimonialId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [name, setName] = useState('');
  const [testimonialText, setTestimonialText] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleShowEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setName(testimonial.name);
    setTestimonialText(testimonial.testimonial);
    setPhoto(testimonial.photo);
    setShowEditDialog(true);
  };

  const handleCloseEdit = () => setShowEditDialog(false);

  const handleShowDeleteConfirm = (testimonialId) => {
    setDeletingTestimonialId(testimonialId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleEditSubmit = async () => {
    try {
      const updatedTestimonial = {
        name,
        testimonial: testimonialText,
        photo,
      };

      await axios.put(`http://localhost:8000/api/v1/admin/testimonials/${editingTestimonial._id}`, updatedTestimonial);
      const updatedTestimonials = testimonials.map((testimonial) =>
        testimonial._id === editingTestimonial._id ? { ...testimonial, ...updatedTestimonial } : testimonial
      );
      setTestimonials(updatedTestimonials);
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error editing testimonial:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/testimonials/${deletingTestimonialId}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== deletingTestimonialId));
      setDeletingTestimonialId(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Testimonial Management', href: '/testimonial-management' },
        ]}
      />

      <Typography variant="h4" gutterBottom>
        Manage Testimonials
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Testimonial</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTestimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell>{testimonial.name}</TableCell>
                <TableCell>{testimonial.testimonial}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleShowEdit(testimonial)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleShowDeleteConfirm(testimonial._id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Testimonial Dialog */}
      <Dialog open={showEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit Testimonial</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Testimonial"
            type="text"
            fullWidth
            value={testimonialText}
            onChange={(e) => setTestimonialText(e.target.value)}
            variant="outlined"
          />
          {/* Optionally, handle photo upload here */}
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
      <Dialog open={showDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this testimonial?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminTestimonial;
