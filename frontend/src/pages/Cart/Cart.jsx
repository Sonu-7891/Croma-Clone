import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  IconButton,
  TextField,
  Divider,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, loading, error } = useSelector(
    (state) => state.cart
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    } else {
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleQuantityChange = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await dispatch(updateCartItem({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = async (productId) => {
    await dispatch(removeFromCart(productId));
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading cart...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item) => (
            <Card key={item.product._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6">{item.product.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.product.price}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity,
                            -1
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        size="small"
                        sx={{ width: 60, mx: 1 }}
                        InputProps={{ readOnly: true }}
                      />
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity,
                            1
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(item.product._id)}
                        sx={{ ml: "auto" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${totalAmount.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
