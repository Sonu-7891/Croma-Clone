import React from "react";
import { Box, Container, Typography, styled, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const OfferContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(4, 0),
}));

const OfferCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const OfferImage = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
});

const bankOffers = [
  {
    id: 1,
    image: "/images/hdfc-offer.jpg",
    title:
      "Enjoy up to 5% extra savings at Croma with Tata Neu HDFC Bank Credit Card",
    link: "/offers/hdfc",
  },
  {
    id: 2,
    image: "/images/icici-offer.jpg",
    title: "Check Out Bank Offers on Your Favourite Brands",
    link: "/offers/icici",
  },
  {
    id: 3,
    image: "/images/icici-instant.jpg",
    title: "10% Instant Discount* Up to ₹3,000 on Credit Cards",
    link: "/offers/icici-instant",
  },
];

const BankOffers = () => {
  return (
    <OfferContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ color: "#fff", mb: 4 }}>
          Exciting Bank Offers For You
        </Typography>

        <Grid container spacing={3}>
          {bankOffers.map((offer, index) => (
            <Grid item key={offer.id} xs={12} md={index === 2 ? 12 : 6}>
              <OfferCard
                component={Link}
                to={offer.link}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <OfferImage
                  src={offer.image}
                  alt={offer.title}
                  loading="lazy"
                />
              </OfferCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </OfferContainer>
  );
};

export default BankOffers;
