import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import axios from 'axios';
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import Breadcrumbs from '../breadcrumb';

const AdminSettings = () => {
  const [homepageSettings, setHomepageSettings] = useState({});
  const [bannerSettings, setBannerSettings] = useState({});
  const [footerSettings, setFooterSettings] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSettings, setEditSettings] = useState({});
  const [currentSettingsType, setCurrentSettingsType] = useState('');

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // Fetch settings from your API
        const [homepageResponse, bannerResponse, footerResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'homepage' } }),
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'banner' } }),
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'footer' } }),
        ]);

        setHomepageSettings(homepageResponse.data);
        setBannerSettings(bannerResponse.data);
        setFooterSettings(footerResponse.data);
      } catch (error) {
        setFeedbackMessage('Error fetching settings.');
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Update settings using PUT request
      await axios.put('http://localhost:8000/api/v1/settings', { type: currentSettingsType, ...editSettings });

      // Update local state based on type
      if (currentSettingsType === 'homepage') setHomepageSettings(editSettings);
      if (currentSettingsType === 'banner') setBannerSettings(editSettings);
      if (currentSettingsType === 'footer') setFooterSettings(editSettings);

      setFeedbackMessage(`${currentSettingsType.charAt(0).toUpperCase() + currentSettingsType.slice(1)} settings updated successfully.`);
    } catch (error) {
      setFeedbackMessage(`Error updating ${currentSettingsType} settings.`);
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
      setOpenEditDialog(false);
    }
  };

  const handleOpenEditDialog = (settingsType) => {
    setCurrentSettingsType(settingsType);
    if (settingsType === 'homepage') setEditSettings(homepageSettings);
    if (settingsType === 'banner') setEditSettings(bannerSettings);
    if (settingsType === 'footer') setEditSettings(footerSettings);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Content Management', href: '/content' },
          { label: 'Admin Settings', href: '/admin-settings' }
        ]}
      />
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Admin Settings
      </Typography>

      {feedbackMessage && (
        <Alert severity={feedbackMessage.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {feedbackMessage}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Homepage Settings
              </Typography>
              <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEditDialog('homepage')}>
                Edit Homepage
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Banner Settings
              </Typography>
              <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEditDialog('banner')}>
                Edit Banner
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Footer Settings
              </Typography>
              <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEditDialog('footer')}>
                Edit Footer
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {currentSettingsType.charAt(0).toUpperCase() + currentSettingsType.slice(1)} Settings</DialogTitle>
        <DialogContent>
          {currentSettingsType === 'homepage' && (
            <>
              <TextField
                margin="dense"
                label="Font Size"
                name="fontSize"
                value={editSettings.fontSize || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Background Color"
                name="bgColor"
                value={editSettings.bgColor || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </>
          )}
          {currentSettingsType === 'banner' && (
            <>
              <TextField
                margin="dense"
                label="Banner Text"
                name="text"
                value={editSettings.text || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Subtext"
                name="subText"
                value={editSettings.subText || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Font Size"
                name="fontSize"
                value={editSettings.fontSize || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Background Color"
                name="backgroundColor"
                value={editSettings.backgroundColor || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </>
          )}
          {currentSettingsType === 'footer' && (
            <>
              <TextField
                margin="dense"
                label="Privacy Policy URL"
                name="privacyPolicy"
                value={editSettings.privacyPolicy || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Terms of Service URL"
                name="termsOfService"
                value={editSettings.termsOfService || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Twitter URL"
                name="twitter"
                value={editSettings.socialLinks?.twitter || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Facebook URL"
                name="facebook"
                value={editSettings.socialLinks?.facebook || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Instagram URL"
                name="instagram"
                value={editSettings.socialLinks?.instagram || ''}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminSettings;
