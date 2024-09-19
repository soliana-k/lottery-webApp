import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Grid, Pagination, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '../../breadcrumb';
import { styled } from '@mui/system';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';


const StyledPaper = styled(Paper)({
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledLink = styled(RouterLink)({
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: '#1976d2',
  fontWeight: 'bold',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const SectionHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const NumberStatusAvailability = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 30;

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
        setNumbers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch numbers:', error);
        setLoading(false);
      }
    };

    fetchNumbers();
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredNumbers = numbers
    .filter((number) => {
      const statusMatches = filter === 'all' || number.selected.toString() === filter;
      const searchMatches = number.number.toString().includes(search);
      return statusMatches && searchMatches;
    })
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (loading) {
    return (
      <Container>
        <StyledPaper>
          <Typography variant="h6">Loading numbers...</Typography>
          <CircularProgress />
        </StyledPaper>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Number Status and Availability', href: '/numbermgmt' }
        ]}
      />
      <StyledPaper>
        <SectionHeader>
          <Typography variant="h6" component="div" style={{ flex: 1 }}>
            Number Status & Availability
          </Typography>
          <StyledLink to="/num">
            <ArrowForwardIcon style={{ marginRight: '8px', fontSize: '20px' }} />
            Go to Number Management
          </StyledLink>
        </SectionHeader>
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <TextField
                label="Search by number"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                label="Status"
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="true">Selected</MenuItem>
                <MenuItem value="false">Available</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Selected By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredNumbers.map((number) => (
                <TableRow key={number._id}>
                  <TableCell>{number._id}</TableCell>
                  <TableCell>{number.number}</TableCell>
                  <TableCell className={number.selected ? 'selected-status' : 'available-status'}>
                    {number.selected ? 'Selected' : 'Available'}
                  </TableCell>
                  <TableCell>{number.selectedBy || 'null'}</TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

       
        <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
  <Pagination
    count={Math.ceil(numbers.length / rowsPerPage)}
    page={currentPage}
    onChange={handlePageChange}
    shape="rounded"
    size="large"
    siblingCount={1}
    boundaryCount={1}
    showFirstButton
    showLastButton
    sx={{
      '& .MuiPagination-ul': {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
      },
      '& .MuiPaginationItem-root': {
        margin: '0 8px',
      },
    }}
  />
</Box>

      </StyledPaper>
    </Container>
  );
};

export default NumberStatusAvailability;
