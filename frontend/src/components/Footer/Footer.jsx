import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  styled,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  YouTube,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  ArrowForward,
} from "@mui/icons-material";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1A1A1A",
  color: "#fff",
  padding: theme.spacing(6, 0),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#fff",
  textDecoration: "none",
  display: "block",
  marginBottom: theme.spacing(1.5),
  "&:hover": {
    color: "#30EFB0",
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "#fff",
  marginRight: theme.spacing(2),
  "&:hover": {
    color: "#30EFB0",
    backgroundColor: "rgba(48, 239, 176, 0.1)",
  },
}));

const EmailInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#30EFB0",
    },
  },
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1.5),
  },
}));

const Footer = () => {
  const usefulLinks = [
    { name: "About Croma", path: "/about" },
    { name: "Help And Support", path: "/help" },
    { name: "FAQs", path: "/faqs" },
    { name: "Buying Guide", path: "/buying-guide" },
    { name: "Return Policy", path: "/return-policy" },
    { name: "B2B Orders", path: "/b2b-orders" },
    { name: "Store Locator", path: "/store-locator" },
    { name: "E-Waste", path: "/e-waste" },
    { name: "Franchise Opportunity", path: "/franchise" },
  ];

  const rightLinks = [
    { name: "Site Map", path: "/site-map" },
    { name: "Careers At Croma", path: "/careers" },
    { name: "Terms Of Use", path: "/terms" },
    { name: "Disclaimer", path: "/disclaimer" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Unboxed", path: "/unboxed" },
    { name: "Gift Card", path: "/gift-card" },
    { name: "Croma E-Star", path: "/e-star" },
  ];

  const products = [
    { name: "Televisions & Accessories", path: "/category/tv" },
    { name: "Home Appliances", path: "/category/home-appliances" },
    { name: "Phones & Wearables", path: "/category/phones" },
    { name: "Computers & Tablets", path: "/category/computers" },
    { name: "Kitchen Appliances", path: "/category/kitchen" },
    { name: "Audio & Video", path: "/category/audio" },
    { name: "Health & Fitness", path: "/category/health" },
  ];

  const rightProducts = [
    { name: "Grooming & Personal Care", path: "/category/grooming" },
    { name: "Cameras & Accessories", path: "/category/cameras" },
    { name: "Smart Devices", path: "/category/smart-devices" },
    { name: "Gaming", path: "/category/gaming" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Top Brands", path: "/brands" },
  ];

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Connect With Us Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              CONNECT WITH US
            </Typography>
            <EmailInput
              fullWidth
              placeholder="Enter Email ID"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: "#000" }}>
                      <ArrowForward />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Box>
              <SocialIcon
                component="a"
                href="https://youtube.com"
                target="_blank"
              >
                <YouTube />
              </SocialIcon>
              <SocialIcon
                component="a"
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </SocialIcon>
              <SocialIcon
                component="a"
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </SocialIcon>
              <SocialIcon
                component="a"
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedIn />
              </SocialIcon>
              <SocialIcon
                component="a"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </SocialIcon>
            </Box>
            <Typography
              variant="body2"
              sx={{ mt: 3, color: "rgba(255,255,255,0.7)" }}
            >
              © Copyright 2025 Croma. All rights reserved
            </Typography>
          </Grid>

          {/* Useful Links Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              USEFUL LINKS
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                {usefulLinks.map((link) => (
                  <FooterLink key={link.name} to={link.path}>
                    {link.name}
                  </FooterLink>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ visibility: "hidden" }}>
              USEFUL LINKS
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                {rightLinks.map((link) => (
                  <FooterLink key={link.name} to={link.path}>
                    {link.name}
                  </FooterLink>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Products Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              PRODUCTS
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                {products.map((product) => (
                  <FooterLink key={product.name} to={product.path}>
                    {product.name}
                  </FooterLink>
                ))}
              </Grid>
              <Grid item xs={12} sm={6} md={12}>
                {rightProducts.map((product) => (
                  <FooterLink key={product.name} to={product.path}>
                    {product.name}
                  </FooterLink>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
