import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

const Orders = () => {
  // This would typically come from your Redux store or API
  const orders = [
    {
      id: "1234",
      date: "2024-02-20",
      status: "Delivered",
      total: 29999,
      items: [{ name: "Smart TV", quantity: 1, price: 29999 }],
    },
    // Add more orders as needed
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        My Orders
      </Typography>

      {orders.map((order) => (
        <Paper key={order.id} elevation={3} sx={{ mb: 3, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Order #{order.id}</Typography>
                <Chip
                  label={order.status}
                  color={order.status === "Delivered" ? "success" : "primary"}
                />
              </Box>
              <Typography color="textSecondary">
                Ordered on: {new Date(order.date).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              {order.items.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ₹{item.price.toLocaleString()}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="h6">
                  Total: ₹{order.total.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}

      {orders.length === 0 && (
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">No orders found</Typography>
          <Typography variant="body1" color="textSecondary">
            You haven't placed any orders yet
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Orders;
