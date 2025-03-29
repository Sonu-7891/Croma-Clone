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
  MenuItem,
  Box,
  Chip,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ServiceRequests = () => {
  const [open, setOpen] = useState(false);

  // This would typically come from your Redux store or API
  const serviceRequests = [
    {
      id: "1",
      productName: "Smart TV",
      issueType: "Repair",
      description: "Screen flickering issue",
      status: "In Progress",
      date: "2024-02-20T10:30:00",
      currentStep: 2,
    },
    // Add more service requests as needed
  ];

  const steps = [
    "Request Received",
    "Under Review",
    "In Progress",
    "Completed",
  ];

  const issueTypes = [
    "Repair",
    "Installation",
    "Maintenance",
    "Replacement",
    "Other",
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "in progress":
        return "primary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement submit functionality
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4, mt: 4 }}
      >
        <Typography variant="h4">Service Requests</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          New Service Request
        </Button>
      </Box>

      <Grid container spacing={3}>
        {serviceRequests.map((request) => (
          <Grid item key={request.id} xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {request.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Issue Type: {request.issueType}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                  >
                    Date: {new Date(request.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {request.description}
                  </Typography>
                </Box>
                <Chip
                  label={request.status}
                  color={getStatusColor(request.status)}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Stepper activeStep={request.currentStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Service Request</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Product Name" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth select label="Issue Type" required>
                  {issueTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {serviceRequests.length === 0 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No service requests found</Typography>
          <Typography variant="body1" color="textSecondary">
            Create a new service request for product repairs or installations
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default ServiceRequests;
