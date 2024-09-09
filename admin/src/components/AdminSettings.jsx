import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '../breadcrumb';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)({
  padding: '8px',
  textAlign: 'center',
  border: '1px solid #e0e0e0',
});

const StyledButton = styled(Button)({
  padding: '4px 8px',
  fontSize: '0.75rem',
  minWidth: '80px',
  height: '32px',
});

const DialogContentStyled = styled(DialogContent)({
  padding: '24px',
  minWidth: '500px',
});

const InputFieldStyled = styled(TextField)({
  marginTop: '16px',
  marginBottom: '16px',
  width: '100%',
});

const AdminSettings = () => {
  const [homepageSettings, setHomepageSettings] = useState({});
  const [bannerSettings, setBannerSettings] = useState({});
  const [footerSettings, setFooterSettings] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSettings, setEditSettings] = useState({});
  const [currentSettingsType, setCurrentSettingsType] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const [homepageResponse, bannerResponse, footerResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'homepage' } }),
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'banner' } }),
          axios.get('http://localhost:8000/api/v1/settings', { params: { type: 'footer' } }),
        ]);

        setHomepageSettings(homepageResponse.data || {});
        setBannerSettings(bannerResponse.data || {});
        setFooterSettings(footerResponse.data || {});
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
      await axios.put('http://localhost:8000/api/v1/settings', { type: currentSettingsType, ...editSettings });

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
    <div className="admin-settings container">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Content Management', href: '/content' },
          { label: 'Admin Settings', href: '/admin-settings' }
        ]}
      />
      <Box sx={{ marginBottom: 3 }}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            display: 'inline-block',
            padding: '8px 16px',
            borderBottom: '4px solid #007bff',
          }}
        >
          Manage Settings
        </Typography>
      </Box>

      {feedbackMessage && (
        <Alert severity={feedbackMessage.includes('successfully') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {feedbackMessage}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Settings Type</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {['homepage', 'banner', 'footer'].map((type) => (
                <TableRow key={type}>
                  <StyledTableCell>{type.charAt(0).toUpperCase() + type.slice(1)} Settings</StyledTableCell>
                  <StyledTableCell>
                    <StyledButton variant="contained" onClick={() => handleOpenEditDialog(type)}>Edit</StyledButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} PaperProps={{ sx: { width: '500px' } }}>
        <DialogTitle>Edit {currentSettingsType.charAt(0).toUpperCase() + currentSettingsType.slice(1)} Settings</DialogTitle>
        <DialogContentStyled>
          {currentSettingsType === 'homepage' && (
            <>
              <InputFieldStyled
                margin="dense"
                label="Font Size"
                name="fontSize"
                value={editSettings.fontSize || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Background Color"
                name="bgColor"
                value={editSettings.bgColor || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </>
          )}
          {currentSettingsType === 'banner' && (
            <>
              <InputFieldStyled
                margin="dense"
                label="Banner Text"
                name="text"
                value={editSettings.text || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Subtext"
                name="subText"
                value={editSettings.subText || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Font Size"
                name="fontSize"
                value={editSettings.fontSize || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Background Color"
                name="backgroundColor"
                value={editSettings.backgroundColor || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </>
          )}
          {currentSettingsType === 'footer' && (
            <>
              <InputFieldStyled
                margin="dense"
                label="Privacy Policy URL"
                name="privacyPolicy"
                value={editSettings.privacyPolicy || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Terms of Service URL"
                name="termsOfService"
                value={editSettings.termsOfService || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Twitter URL"
                name="twitter"
                value={editSettings.socialLinks?.twitter || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Facebook URL"
                name="facebook"
                value={editSettings.socialLinks?.facebook || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Linkedln URL"
                name="linkedln"
                value={editSettings.socialLinks?.linkedln || ''}
                onChange={handleChange}
                variant="outlined"
              />
              <InputFieldStyled
                margin="dense"
                label="Instagram URL"
                name="instagram"
                value={editSettings.socialLinks?.instagram || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </>
          )}
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminSettings;
