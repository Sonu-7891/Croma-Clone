import React from "react";
import { Container, Typography, Paper, Box, Grid, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar sx={{ width: 100, height: 100, mr: 3 }} src={user?.avatar}>
            {user?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {user?.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1">Name: {user?.name}</Typography>
            <Typography variant="body1">Email: {user?.email}</Typography>
            <Typography variant="body1">
              Phone: {user?.phone || "Not provided"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
