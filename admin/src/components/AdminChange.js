import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Breadcrumbs from '../breadcrumb'; // Ensure the correct path to Breadcrumbs component

const AdminDashboard = () => {
  const [fontSize, setFontSize] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/v1/settings');
        setFontSize(response.data.fontSize || '16px');
        setBgColor(response.data.bgColor || '#ffffff');
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/v1/settings', { fontSize, bgColor });
      setFeedbackMessage('Settings updated successfully.');
    } catch (error) {
      console.error('Error updating settings:', error);
      setFeedbackMessage('Error updating settings.');
    }
  };

  return (
    <Container>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Content Management', href: '/content' },
          { label: 'Admin Dashboard', href: '/content/AdminChange' },
        ]}
      />

      <h1 className="mt-4">Admin Dashboard</h1>
      {feedbackMessage && (
        <Alert variant={feedbackMessage.includes('successfully') ? 'success' : 'danger'}>
          {feedbackMessage}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fontSize">
          <Form.Label>Font Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter font size (e.g., 16px)"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="bgColor" className="mt-3">
          <Form.Label>Background Color</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter background color (e.g., #ffffff)"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Settings
        </Button>
      </Form>
    </Container>
  );
};

export default AdminDashboard;
