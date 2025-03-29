import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Addresses = () => {
  const [open, setOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  // This would typically come from your Redux store or API
  const addresses = [
    {
      id: "1",
      name: "John Doe",
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543210",
    },
    // Add more addresses as needed
  ];

  const handleClickOpen = (event, address = null) => {
    if (event) event.preventDefault();
    setEditAddress(address);
    setOpen(true);
  };

  const handleClose = (event) => {
    if (event) event.preventDefault();
    setEditAddress(null);
    setOpen(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    // Implement save functionality
    handleClose();
  };

  const handleDelete = (event, addressId) => {
    event.preventDefault();
    // Implement delete functionality
    console.log("Delete address:", addressId);
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4, mt: 4 }}
      >
        <Typography variant="h4">My Addresses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={(e) => handleClickOpen(e)}
        >
          Add New Address
        </Button>
      </Box>

      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item key={address.id} xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Typography variant="h6" gutterBottom>
                  {address.name}
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleClickOpen(e, address)}
                    aria-label="edit address"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={(e) => handleDelete(e, address.id)}
                    aria-label="delete address"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography>{address.street}</Typography>
              <Typography>
                {address.city}, {address.state}
              </Typography>
              <Typography>PIN: {address.pincode}</Typography>
              <Typography>Phone: {address.phone}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editAddress ? "Edit Address" : "Add New Address"}
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue={editAddress?.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  defaultValue={editAddress?.street}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  defaultValue={editAddress?.city}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  defaultValue={editAddress?.state}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="PIN Code"
                  defaultValue={editAddress?.pincode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue={editAddress?.phone}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleClose(e)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {addresses.length === 0 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center", mt: 3 }}>
          <Typography variant="h6">No addresses found</Typography>
          <Typography variant="body1" color="textSecondary">
            Add a new address to get started
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Addresses;
