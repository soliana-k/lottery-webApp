import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import Breadcrumbs from '../../breadcrumb'; // Adjust the import path as needed
import { styled } from '@mui/system';

// Define your theme
const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  shape: {
    borderRadius: 12,
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
    transform: 'scale(1.05)',
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
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '0.5px',
}));

const TypographyText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  lineHeight: 1.7,
  textAlign: 'center',
}));

const Prizemanagement = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="prizes-management-container" style={{ paddingTop: '50px' }}>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Prizes Management' }
          ]}
        />
        
        {/* Content Sections */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 1, marginTop: 5 }}> {/* Reduced gap */}
          <Box sx={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Add Prizes
              </TypographyTitle>
              <TypographyText variant="body1">
                Manage the Prizes section. Add new prizes.
              </TypographyText>
              <Link to="/prizes/prizes">
                <ButtonStyled variant="contained" color="primary">
                  Go to Add Prizes
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>

          <Box sx={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Modify Prizes
              </TypographyTitle>
              <TypographyText variant="body1">
                Manage the Prizes section. Edit or delete frequently added prizes.
              </TypographyText>
              <Link to="/prizes/editprize">
                <ButtonStyled variant="contained" color="primary">
                  Go to Edit or Delete Prizes
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Prizemanagement;
