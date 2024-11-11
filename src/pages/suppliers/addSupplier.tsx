import { useState, useEffect } from 'react';
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
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import API_BASE_URL from '../../config/ApiConfig';

type Supplier = {
  id?: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  source: string;
  join_date: string;
};

const AddSupplier = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const supplierToEdit = location.state?.supplier || null;

  const [supplier, setSupplier] = useState<Supplier>(
    supplierToEdit || {
      name: '',
      contact_person: '',
      phone: '',
      email: '',
      address: '',
      source: 'local',
      join_date: '',
    },
  );

  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (supplierToEdit) {
      setSupplier(supplierToEdit);
    }
  }, [supplierToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = supplierToEdit
        ? `${API_BASE_URL}/suppliers/${supplier.id}`
        : `${API_BASE_URL}/suppliers`;
      const method = supplierToEdit ? 'put' : 'post';
      await axios[method](url, supplier);
      setMessage(
        `Supplier ${supplierToEdit ? 'updated' : 'added'} successfully!`,
      );
      setOpenSnackbar(true);
      navigate('/suppliersList');
    } catch (error) {
      setMessage(`Error ${supplierToEdit ? 'updating' : 'adding'} supplier`);
      setOpenSnackbar(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5">
          {supplierToEdit ? 'Edit Supplier' : 'Add Supplier'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={supplier.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Person"
              name="contact_person"
              value={supplier.contact_person}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={supplier.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={supplier.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={supplier.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Join Date"
              type="date"
              name="join_date"
              value={supplier.join_date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              sx={{ ml: 2 }}
              onClick={() => navigate('/suppliersList')}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddSupplier;
