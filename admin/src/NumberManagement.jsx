import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import Breadcrumbs from './breadcrumb';
import { styled } from '@mui/system';

// Create a custom theme
const theme = createTheme({
  spacing: 4, // Default spacing for padding and margins
  palette: {
    primary: {
      main: '#3f51b5', // A modern shade of blue for primary color
    },
    secondary: {
      main: '#f50057', // A vibrant pink for secondary color
    },
    background: {
      paper: '#ffffff', // Clean white background for Paper
    },
    text: {
      primary: '#212121', // Dark grey for primary text
      secondary: '#757575', // Lighter grey for secondary text
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for elements
  },
  shadows: [
    'none', 
    '0px 2px 4px rgba(0, 0, 0, 0.1)', 
    '0px 4px 8px rgba(0, 0, 0, 0.2)', 
    '0px 6px 12px rgba(0, 0, 0, 0.3)', 
  ],
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'scale(1.05)', // Slight scale up on hover for interactive effect
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  fontSize: '0.875rem',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[2],
  },
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 600, // Bold title
  color: theme.palette.primary.main,
  letterSpacing: '0.5px', // Slight letter spacing for a refined look
}));

const TypographyText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  lineHeight: 1.7, // Improved line height for readability
  textAlign: 'center', // Center-align text for a balanced look
}));

const NumberManagement = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="number-management-container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/home/' },
            { label: 'Number Management', href: '/numbermgmt' }
          ]}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 5 }}>
          <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Draw Management
              </TypographyTitle>
              <TypographyText variant="body1">
                Manage and create draws. View existing draws and edit or delete them as needed.
              </TypographyText>
              <Link to="/draw">
                <ButtonStyled variant="contained" color="primary">
                  Go to Draw Management
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>

          <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Number Availability & Status
              </TypographyTitle>
              <TypographyText variant="body1">
                View and manage the availability of numbers. Check the status of numbers and update them as required.
              </TypographyText>
              <Link to="/numbermgmt">
                <ButtonStyled variant="contained" color="primary">
                  Go to Number Availability & Status
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>

          <Box sx={{ flex: '1 1 45%', minWidth: 300, maxWidth: 478 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Audit Logs
              </TypographyTitle>
              <TypographyText variant="body1">
                View audit logs for both number management and draw management.
              </TypographyText>
              <Link to="/audit-logs">
                <ButtonStyled variant="contained" color="primary">
                  Go to Audit Logs
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default NumberManagement;
