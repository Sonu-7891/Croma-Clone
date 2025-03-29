import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import TabletIcon from "@mui/icons-material/Tablet";

const Devices = () => {
  // This would typically come from your Redux store or API
  const devices = [
    {
      id: "1",
      name: "iPhone 13",
      type: "Mobile",
      lastActive: "2024-02-20T10:30:00",
      status: "Active",
    },
    {
      id: "2",
      name: "MacBook Pro",
      type: "Laptop",
      lastActive: "2024-02-19T15:45:00",
      status: "Inactive",
    },
    // Add more devices as needed
  ];

  const getDeviceIcon = (type) => {
    switch (type.toLowerCase()) {
      case "mobile":
        return <PhoneAndroidIcon />;
      case "laptop":
        return <LaptopIcon />;
      case "tablet":
        return <TabletIcon />;
      default:
        return <DevicesIcon />;
    }
  };

  const handleRemoveDevice = (deviceId) => {
    // Implement remove device functionality
    console.log("Remove device:", deviceId);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        My Devices
      </Typography>

      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item key={device.id} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {getDeviceIcon(device.type)}
                  <Typography variant="h6">{device.name}</Typography>
                </Box>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveDevice(device.id)}
                  aria-label="remove device"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Type: {device.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last Active: {new Date(device.lastActive).toLocaleString()}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={device.status}
                    color={device.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {devices.length === 0 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No devices found</Typography>
          <Typography variant="body1" color="textSecondary">
            Your devices will appear here when you log in from different devices
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Devices;
