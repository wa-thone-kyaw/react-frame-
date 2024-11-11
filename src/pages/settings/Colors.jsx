import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/apiConfig';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';

const Colors = () => {
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [editColor, setEditColor] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // New states for delete confirmation
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/colors`);
      setColors(response.data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  const handleAddColor = async () => {
    if (!newColor.trim()) {
      setSnackbarMessage('Color name cannot be empty!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/colors`, { color_name: newColor });
      setSnackbarMessage('Color added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setNewColor('');
      fetchColors();
    } catch (error) {
      setSnackbarMessage('Error adding color!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenDeleteDialog = (color) => {
    setColorToDelete(color);
    setOpenDeleteDialog(true);
  };

  const handleDeleteColor = async () => {
    if (deleteConfirmationText === 'DELETE') {
      try {
        await axios.delete(`${API_BASE_URL}/colors/${colorToDelete.id}`);
        setSnackbarMessage('Color deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchColors();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setSnackbarMessage(error.response.data.error);
        } else {
          setSnackbarMessage(
            'Cannot delete this color because it is associated with one or more products.!',
          );
        }
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setOpenDeleteDialog(false);
        setDeleteConfirmationText(''); // Reset confirmation text
      }
    } else {
      setSnackbarMessage("You must type 'DELETE' to confirm.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOpenEditDialog = (color) => {
    setEditColor(color);
    setOpenEditDialog(true);
  };

  const handleEditColor = async () => {
    try {
      await axios.put(`${API_BASE_URL}/colors/${editColor.id}`, {
        color_name: editColor.color_name,
      });
      setSnackbarMessage('Color updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setOpenEditDialog(false);
      setEditColor(null);
      fetchColors();
    } catch (error) {
      setSnackbarMessage('Error updating color!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Colors Management
        </Typography>

        {/* Add New Color Section */}
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ marginBottom: 1 }}
        >
          <Grid item xs={9} sm={10}>
            <TextField
              fullWidth
              label="Add New Color"
              variant="outlined"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              sx={{ backgroundColor: '#fff' }}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <Button
              onClick={handleAddColor}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: '90%' }}
            >
              Add Color
            </Button>
          </Grid>
        </Grid>

        {/* Colors List */}
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="textSecondary">
                    Color Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" color="textSecondary">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors.map((color) => (
                <TableRow key={color.id} hover>
                  <TableCell>{color.color_name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleOpenEditDialog(color)}
                      color="primary"
                      aria-label="edit"
                      size="large"
                    >
                      <EditIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleOpenDeleteDialog(color)}
                      color="error"
                      aria-label="delete"
                      size="large"
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Color Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Color</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can edit the color name below:
            </DialogContentText>
            <TextField
              fullWidth
              label="Edit Color Name"
              variant="outlined"
              value={editColor?.color_name || ''}
              onChange={(e) =>
                setEditColor({ ...editColor, color_name: e.target.value })
              }
              sx={{ marginTop: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditColor} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To confirm deletion, please type "DELETE":
            </DialogContentText>
            <TextField
              autoFocus
              fullWidth
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDeleteDialog(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteColor} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Colors;
