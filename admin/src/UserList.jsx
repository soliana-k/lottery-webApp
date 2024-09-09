import React, { useState, useEffect } from "react";
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
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import Breadcrumbs from "./breadcrumb";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/admin/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleShowEdit = (user) => {
    setEditingUser(user);
    setUserId(user._id);
    setFullName(user.fullname);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setProfilePhoto(user.profilePhoto);
    setShowEditUser(true);
  };

  const handleCloseEdit = () => setShowEditUser(false);

  const handleShowDeleteConfirm = (userId) => {
    setDeletingUserId(userId);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);

  const handleEditSubmit = async () => {
    try {
      const updatedUser = {
        fullname: fullName,
        email,
        phoneNumber,
        profilePhoto,
      };
      await axios.put(
        `http://localhost:8000/api/admin/users/${editingUser._id}`,
        updatedUser
      );
      const updatedUsers = users.map((user) =>
        user._id === editingUser._id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
      setShowEditUser(false);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/users/${deletingUserId}`
      );
      setUsers(users.filter((user) => user._id !== deletingUserId));
      setDeletingUserId(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/home" },
          { label: "User Management", href: "/user" },
          { label: "User List", href: "/user-list" },
        ]}
      />
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            User List
          </Typography>
        </Grid>
      </Grid>

      <div className="search-bar-container">
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
          className="search-bar"
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              {/* <TableCell>Profile Photo</TableCell> */}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                {/* <TableCell>
                  <img
                    src={user.profilePhoto}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell> */}
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleShowEdit(user)}
                    color="primary"
                    style={{ padding: '2px' }} 
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleShowDeleteConfirm(user._id)}
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

      {/* Edit User Dialog */}
      <Dialog open={showEditUser} onClose={handleCloseEdit}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="text"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
          />
          {/* <TextField
            margin="dense"
            label="Profile Photo URL"
            type="text"
            fullWidth
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            variant="outlined"
          /> */}
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
          <Typography>Are you sure you want to delete this user?</Typography>
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

export default UserList;
