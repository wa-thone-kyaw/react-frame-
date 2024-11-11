// Customers.tsx

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import {
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useMediaQuery,
  Container,
  useTheme, // Import useTheme for accessing the theme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API_BASE_URL from '../../config/ApiConfig';
type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  business_name: string;
};

const Customers = () => {
  const theme = useTheme(); // Get the current theme
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  //const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      setSuccessMessage(
        `Error fetching customers: ${
          (error as any).response?.data?.message || 'Server error'
        }`,
      );
      setOpenSnackbar(true);
    }
  };

  const handleOpenDeleteDialog = (customer: Customer) => {
    setCustomerToDelete(customer);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCustomer = async () => {
    if (customerToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/customers/${customerToDelete.id}`);
        setSuccessMessage('Customer deleted successfully!');
        fetchCustomers();
      } catch {
        setSuccessMessage('Error deleting customer');
      } finally {
        setOpenDeleteDialog(false);
        setOpenSnackbar(true);
        setLoading(false);
      }
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const columns = useMemo<MRT_ColumnDef<Customer>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'address', header: 'Address' },
      { accessorKey: 'business_name', header: 'Business Name' },
      {
        header: 'Actions',
        Cell: ({ row }) => (
          <>
            <IconButton
              color="primary"
              onClick={() =>
                navigate('/addCustomer', { state: { customer: row.original } })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleOpenDeleteDialog(row.original)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [navigate],
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={customers}
        muiTableBodyCellProps={{
          style: {
            backgroundColor:
              theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff',
            color:
              theme.palette.mode === 'dark' ? theme.palette.grey[100] : '#000',
          },
        }}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCustomer}
            color="secondary"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

export default Customers;
