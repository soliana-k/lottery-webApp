import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button, Typography, Box, ThemeProvider, createTheme } from '@mui/material';
import Breadcrumbs from '../../breadcrumb'; 
import { styled } from '@mui/system';

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

const ContentManagement = () => {
  const [showFAQManagement, setShowFAQManagement] = useState(false);

  const handleFAQManagementToggle = () => {
    setShowFAQManagement((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="content-management-container">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/home' },
            { label: 'Content Management', href: '/contentmgmt' }
          ]}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 5 }}>
          {/* FAQ Management Section */}
          <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                FAQ Management
              </TypographyTitle>
              <TypographyText variant="body1">
                Manage the FAQ section. Add, edit, or delete frequently asked questions.
              </TypographyText>
              <ButtonStyled variant="contained" color="primary" onClick={handleFAQManagementToggle}>
                {showFAQManagement ? 'Hide FAQ Management' : 'Show FAQ Management'}
              </ButtonStyled>
            </StyledPaper>
          </Box>

          {showFAQManagement && (
            <>
              <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
                <StyledPaper>
                  <TypographyTitle variant="h6" component="h2">
                    Add FAQ
                  </TypographyTitle>
                  <TypographyText variant="body1">
                    Add new FAQs to the section.
                  </TypographyText>
                  <Link to="/content/FAQ/AddFAQ">
                    <ButtonStyled variant="contained" color="primary">
                      Go to Add FAQ
                    </ButtonStyled>
                  </Link>
                </StyledPaper>
              </Box>

              <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
                <StyledPaper>
                  <TypographyTitle variant="h6" component="h2">
                    Manage FAQs
                  </TypographyTitle>
                  <TypographyText variant="body1">
                    View and Manage Submitted FAQs.
                  </TypographyText>
                  <Link to="/content/FAQ/ManageFAQs">
                    <ButtonStyled variant="contained" color="primary">
                      Go to Manage FAQs
                    </ButtonStyled>
                  </Link>
                </StyledPaper>
              </Box>
            </>
          )}

          {/* Testimonials Management Section */}
          <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Testimonials Management
              </TypographyTitle>
              <TypographyText variant="body1">
                View and manage user testimonials. Add, edit, or remove testimonials as needed.
              </TypographyText>
              <Link to="/content/Testimonals/testimonials">
                <ButtonStyled variant="contained" color="primary">
                  Go to Testimonials Management
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>

          {/* Home Page Management Section */}
          <Box sx={{ flex: '1 1 45%', minWidth: 300 }}>
            <StyledPaper>
              <TypographyTitle variant="h6" component="h2">
                Home Page Management
              </TypographyTitle>
              <TypographyText variant="body1">
                Manage and edit the home page and the main banner.
              </TypographyText>
              <Link to="/content/AdminSettings">
                <ButtonStyled variant="contained" color="primary">
                  Go to Home Page Management
                </ButtonStyled>
              </Link>
            </StyledPaper>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default ContentManagement;
