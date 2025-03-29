import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  TextField,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import { addToCart } from "../../features/cartSlice";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(addToCart({ productId: id, quantity })).unwrap();
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading product details...</Typography>
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

  if (!product) {
    return (
      <Container>
        <Alert severity="error">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={product.averageRating} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.ratings.length} reviews)
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Quantity:
            </Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              inputProps={{ min: 1, max: product.stock }}
              sx={{ width: 100 }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Specifications" />
          <Tab label="Reviews" />
          <Tab label="Related Products" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Product Specifications
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {key}
                        </Typography>
                        <Typography>{value}</Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {activeTab === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer Reviews
                </Typography>
                {product.ratings.map((rating, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Rating value={rating.rating} readOnly size="small" />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{rating.review}</Typography>
                    <Divider sx={{ my: 2 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === 2 && (
            <Grid container spacing={3}>
              {/* Add related products here */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Similar Products
                </Typography>
                {/* Add similar products grid here */}
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;
