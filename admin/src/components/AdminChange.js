import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Breadcrumbs from '../breadcrumb';

const AdminDashboard = () => {
  const [fontSize, setFontSize] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/v1/settings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
      const response = await fetch('/api/v1/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fontSize, bgColor }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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

      <h1 className="mt-4">Home Page Settings Change</h1>
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
