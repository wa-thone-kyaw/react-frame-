import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import API_BASE_URL from '../../config/ApiConfig';

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  business_name: string;
};

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCustomer: Customer | null = location.state?.customer || null;

  const [customer, setCustomer] = useState<Customer>(
    editingCustomer || {
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      business_name: '',
    },
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!customer.name) tempErrors.name = 'Name is required.';
    if (!customer.email) tempErrors.email = 'Valid email is required.';
    if (!customer.phone) tempErrors.phone = 'Valid phone is required.';
    if (!customer.business_name)
      tempErrors.business_name = 'Business name is required.';
    if (!customer.address) tempErrors.address = 'Address is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editingCustomer) {
      await updateCustomer();
    } else {
      await addCustomer();
    }
  };

  const addCustomer = async () => {
    try {
      await axios.post(`${API_BASE_URL}/customers`, customer);
      setSuccessMessage('Customer added successfully!');
      setOpenSnackbar(true);
      navigate('/customersList');
    } catch {
      setSuccessMessage('Error adding customer');
      setOpenSnackbar(true);
    }
  };

  const updateCustomer = async () => {
    try {
      await axios.put(`${API_BASE_URL}/customers/${customer.id}`, customer);
      setSuccessMessage('Customer updated successfully!');
      setOpenSnackbar(true);
      navigate('/customersList');
    } catch {
      setSuccessMessage('Error updating customer');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {editingCustomer ? 'Edit Customer' : 'Add Customer'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={customer.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Business Name"
              name="business_name"
              value={customer.business_name}
              onChange={handleInputChange}
              error={!!errors.business_name}
              helperText={errors.business_name}
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              {editingCustomer ? 'Update' : 'Add'} Customer
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={() => navigate('/customersList')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={successMessage.includes('Error') ? 'error' : 'success'}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddCustomer;
