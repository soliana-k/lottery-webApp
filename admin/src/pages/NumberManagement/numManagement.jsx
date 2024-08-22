import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,  Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '../../breadcrumb';
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
  padding: '24px', // Add padding around the content
  minWidth: '500px', // Increase the minimum width for more space
});

const InputFieldStyled = styled(TextField)({
  marginTop: '16px',  // Add top margin
  marginBottom: '16px', // Add bottom margin
  width: '100%',
});

const NumManagement = () => {
  const [numbers, setNumbers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openMassAddDialog, setOpenMassAddDialog] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [massAddCount, setMassAddCount] = useState('');
  const columnsPerRow = 13;

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/lottery/availableNumbers');
        setNumbers(response.data);
      } catch (error) {
        console.error('Error fetching numbers:', error);
      }
    };

    fetchNumbers();
  }, []);

  const handleDeleteNumber = async (number) => {
    const confirmed = window.confirm(`Are you sure you want to delete number ${number}?`);
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:8000/api/v1/lottery/deleteNumber/${number}`);
      if (response.status === 200) {
        setNumbers(numbers.filter(n => n.number !== number));
        console.log(`Number ${number} deleted.`);
      }
    } catch (error) {
      console.error('Error deleting number:', error);
    }
  };

  const handleAddNumber = async () => {
    if (!newNumber) return;

    try {
      const response = await axios.post('http://localhost:8000/api/v1/lottery/addNumber', { number: newNumber });
      if (response.status === 201) {
        setNumbers([...numbers, response.data]);
        setNewNumber('');
        setOpenAddDialog(false);
      }
    } catch (error) {
      console.error('Error adding number:', error);
    }
  };

  const handleMassAdd = async () => {
    const count = parseInt(massAddCount, 10);
    if (!count || count < 1 || count > 81) return;

    const massNumbers = Array.from({ length: count }, (_, i) => i + 1);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/lottery/massAddNumbers', { numbers: massNumbers });
      if (response.status === 201) {
        setNumbers([...numbers, ...response.data]);
        setMassAddCount('');
        setOpenMassAddDialog(false);
      }
    } catch (error) {
      console.error('Error mass adding numbers:', error);
    }
  };

  const renderTableRows = () => {
    const rows = [];
    for (let i = 0; i < numbers.length; i += columnsPerRow) {
      const row = numbers.slice(i, i + columnsPerRow);
      rows.push(
        <TableRow key={i}>
          {row.map((number, index) => (
            <StyledTableCell key={index}>
              {number.number}
              <IconButton onClick={() => handleDeleteNumber(number.number)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </StyledTableCell>
          ))}
        </TableRow>
      );
    }
    return rows;
  };

  return (
    <div className="number-selection container">
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number/' },
          { label: 'Number Status and Availability', href: '/numbermgmt' },
          { label: 'Number Management', href: '/num' },
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
    Manage Numbers
  </Typography>
</Box>

















      {/* Buttons to open modals */}
      <Box sx={{ marginBottom: 2, display: 'flex', gap: 2 }}>
        <StyledButton variant="contained" onClick={() => setOpenAddDialog(true)}>Add Number</StyledButton>
        <StyledButton variant="contained" onClick={() => setOpenMassAddDialog(true)}>Mass Add Numbers</StyledButton>
      </Box>

      {/* Add Number Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} PaperProps={{ sx: { width: '500px' } }}>
        <DialogTitle>Add Number</DialogTitle>
        <DialogContentStyled>
          <InputFieldStyled
            label="Enter number to add"
            variant="outlined"
            size="small"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <StyledButton onClick={handleAddNumber}>Add Number</StyledButton>
        </DialogActions>
      </Dialog>

      {/* Mass Add Numbers Dialog */}
      <Dialog open={openMassAddDialog} onClose={() => setOpenMassAddDialog(false)} PaperProps={{ sx: { width: '500px' } }}>
        <DialogTitle>Mass Add Numbers</DialogTitle>
        <DialogContentStyled>
          <InputFieldStyled
            label="Enter count for mass add"
            variant="outlined"
            size="small"
            value={massAddCount}
            onChange={(e) => setMassAddCount(e.target.value)}
          />
        </DialogContentStyled>
        <DialogActions>
          <Button onClick={() => setOpenMassAddDialog(false)}>Cancel</Button>
          <StyledButton onClick={handleMassAdd}>Mass Add Numbers</StyledButton>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Numbers</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NumManagement;
