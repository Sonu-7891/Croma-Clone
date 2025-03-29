import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Wishlist = () => {
  // This would typically come from your Redux store or API
  const wishlistItems = [
    {
      id: "1",
      name: "Smart TV",
      price: 29999,
      image: "https://picsum.photos/300/200",
    },
    // Add more items as needed
  ];

  const handleRemoveFromWishlist = (event, itemId) => {
    event.preventDefault();
    // Implement remove from wishlist functionality
    console.log("Remove from wishlist:", itemId);
  };

  const handleAddToCart = (event, itemId) => {
    event.preventDefault();
    // Implement add to cart functionality
    console.log("Add to cart:", itemId);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        My Wishlist
      </Typography>

      {wishlistItems.length > 0 ? (
        <Grid container spacing={3}>
          {wishlistItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      item.name
                    )}&size=200`;
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₹{item.price.toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<ShoppingCartIcon />}
                    variant="contained"
                    size="small"
                    onClick={(e) => handleAddToCart(e, item.id)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton
                    color="error"
                    onClick={(e) => handleRemoveFromWishlist(e, item.id)}
                    aria-label="remove from wishlist"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6">Your wishlist is empty</Typography>
          <Typography variant="body1" color="textSecondary">
            Add items to your wishlist to save them for later
          </Typography>
        </Card>
      )}
    </Container>
  );
};

export default Wishlist;
