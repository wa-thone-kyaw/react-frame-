import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MaterialReactTable from 'material-react-table';
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
  Container,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API_BASE_URL from '../../config/ApiConfig';

type Supplier = {
  id: number;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  source: string;
  join_date: string;
};

const SupplierList = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(
    null,
  );
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/suppliers`);
        setSuppliers(response.data);
      } catch (error) {
        setMessage('Failed to fetch suppliers');
        setOpenSnackbar(true);
      }
    };
    fetchSuppliers();
  }, []);

  const handleOpenDeleteDialog = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setOpenDeleteDialog(true);
  };

  const handleDeleteSupplier = async () => {
    if (supplierToDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/suppliers/${supplierToDelete.id}`);
        setSuppliers((prev) =>
          prev.filter((s) => s.id !== supplierToDelete.id),
        );
        setMessage('Supplier deleted successfully!');
      } catch (error) {
        setMessage('Failed to delete supplier');
      } finally {
        setOpenDeleteDialog(false);
        setOpenSnackbar(true);
      }
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'contact_person', header: 'Contact Person' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'address', header: 'Address' },
      { accessorKey: 'source', header: 'Source' },
      { accessorKey: 'join_date', header: 'Join Date' },
      {
        header: 'Actions',
        Cell: ({ row }: { row: { original: Supplier } }) => (
          <>
            <IconButton
              color="primary"
              onClick={() =>
                navigate(`/addSupplier/${row.original.id}`, {
                  state: { supplier: row.original },
                })
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
    <Container maxWidth="lg">
      <MaterialReactTable columns={columns} data={suppliers} />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this supplier?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="secondary" onClick={handleDeleteSupplier}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="info">
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SupplierList;
