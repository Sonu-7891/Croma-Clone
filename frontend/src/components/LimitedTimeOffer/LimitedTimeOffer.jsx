import React from "react";
import { Box, Container, Typography, Grid, Paper, styled } from "@mui/material";

const OfferContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(4, 0),
}));

const OfferBanner = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #4A3B96 0%, #382C73 100%)",
  borderRadius: "16px",
  padding: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  border: "2px solid rgba(255, 255, 255, 0.1)",
}));

const ExchangeText = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const AmountText = styled(Typography)(({ theme }) => ({
  color: "#30EFB0",
  fontSize: "3.5rem",
  fontWeight: "bold",
  marginTop: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.5rem",
  },
}));

const ProductCard = styled(Paper)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: "12px",
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const DateBadge = styled(Box)(({ theme }) => ({
  background: "#30EFB0",
  color: "#000",
  padding: theme.spacing(0.5, 2),
  borderRadius: "20px",
  display: "inline-block",
  marginTop: theme.spacing(2),
}));

const BankLogo = styled("img")(({ theme }) => ({
  height: "30px",
  marginRight: theme.spacing(2),
}));

const LimitedTimeOffer = () => {
  const products = [
    {
      id: 1,
      name: "Coolers",
      discount: "Flat 10% Off",
      image:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/Small%20Appliances/Air%20Coolers/Images/270515_0_qzcvxv.png",
    },
    {
      id: 2,
      name: "Intel Core i3 Laptop",
      price: "₹29,691*",
      originalPrice: "₹64,990",
      image:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684242615/Croma%20Assets/Computers%20Peripherals/Laptop/Images/256605_0_qd6x8y.png",
    },
    {
      id: 3,
      name: "1.5 Ton Inverter AC",
      price: "₹27,890*",
      originalPrice: "₹42,000",
      note: "*Exchange + Coupon Code",
      image:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689327400/Croma%20Assets/Small%20Appliances/Air%20Conditioners/Images/275990_0_q0nxfj.png",
    },
    {
      id: 4,
      name: '43" Ultra HD TV',
      price: "₹19,971*",
      originalPrice: "₹39,000",
      note: "*Inclusive of all Offers",
      image:
        "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697019937/Croma%20Assets/Entertainment/Television/Images/273655_0_gel2lc.png",
    },
  ];

  return (
    <OfferContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
          Limited Time Offer
        </Typography>
        <OfferBanner elevation={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box>
                <ExchangeText>Exchange Benefits Up to</ExchangeText>
                <AmountText>₹30,000*</AmountText>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <BankLogo
                    src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1676968095/Croma%20Assets/CMS/Bank/ICICI_logo.png"
                    alt="ICICI Bank"
                  />
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    10% Up to ₹3,000 Instant Discount* on Credit Cards
                  </Typography>
                </Box>
                <DateBadge>
                  <Typography variant="body2" fontWeight="bold">
                    27th - 30th March
                  </Typography>
                </DateBadge>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} key={product.id}>
                    <ProductCard elevation={1}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontSize: "1rem", mb: 1 }}
                          >
                            {product.name}
                          </Typography>
                          {product.discount && (
                            <Typography
                              variant="body1"
                              sx={{ color: "#4A3B96", fontWeight: "bold" }}
                            >
                              {product.discount}
                            </Typography>
                          )}
                          {product.price && (
                            <Box>
                              <Typography
                                variant="h6"
                                component="span"
                                sx={{
                                  color: "#4A3B96",
                                  fontWeight: "bold",
                                  mr: 1,
                                }}
                              >
                                {product.price}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                  textDecoration: "line-through",
                                  color: "#666",
                                }}
                              >
                                {product.originalPrice}
                              </Typography>
                            </Box>
                          )}
                          {product.note && (
                            <Typography
                              variant="caption"
                              sx={{ display: "block", color: "#666", mt: 0.5 }}
                            >
                              {product.note}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          sx={{
                            width: "100px",
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </Box>
                      </Box>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </OfferBanner>
      </Container>
    </OfferContainer>
  );
};

export default LimitedTimeOffer;
