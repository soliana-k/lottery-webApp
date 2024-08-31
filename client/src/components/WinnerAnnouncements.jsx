// WinnerAnnouncements.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material';

function WinnerAnnouncements() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch('/api/v1/winners'); // Ensure the URL matches the backend route
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWinners(data);
      } catch (error) {
        console.error('Error fetching winner announcements:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Winner Announcements</Typography>
      <List>
        {winners.map(winner => (
          <ListItem key={winner._id}>
            <ListItemText
              primary={`Winner ID: ${winner._id}`}
              secondary={`Date: ${new Date(winner.date).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default WinnerAnnouncements;
