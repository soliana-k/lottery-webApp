import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import "./UserList.css";
import Breadcrumbs from "./breadcrumb";

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
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setProfilePhoto("");
      setEditingUser(null);
      handleCloseEdit();
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
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/home" },
          { label: "User Management", href: "/user" },
          { label: "User List", href: "/user-list" },
        ]}
      />
      <Row className="my-4">
        <Col md={12}>
          <h2 className="mb-4">User List</h2>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Profile Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <img
                      src={user.profilePhoto}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleShowEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDeleteConfirm(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showEditUser} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="editUserFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editUserEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editUserPhoneNumber" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editUserProfilePhoto" className="mt-3">
                  <Form.Label>Profile Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={profilePhoto}
                    onChange={(e) => setProfilePhoto(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this user?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteConfirm}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
