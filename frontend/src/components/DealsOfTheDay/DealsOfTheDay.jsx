import React from "react";
import { Box, Container, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const DealsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000000",
  padding: theme.spacing(4, 0),
 
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: 600,
  marginBottom: theme.spacing(3),
}));

const CardGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const DealCard = styled(Link)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  width: "275px",
  height: "362px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  aspectRatio: "1",
  background: "linear-gradient(135deg, #2C3E50, #3498db)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const deals = [
  {
    id: 1,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1743157199/Croma%20Assets/CMS/LP%20Page%20Banners/2025/DOTD/March/29032025/Desktop/HP_DOTD_AD_29March25_ycecfe.jpg?tr=w-1024",
    link: "/category/speakers",
    gradient: "linear-gradient(135deg, #614385, #516395)",
  },
  {
    id: 2,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1743157199/Croma%20Assets/CMS/LP%20Page%20Banners/2025/DOTD/March/29032025/Desktop/HP_DOTD_AD_29March25_ycecfe.jpg?tr=w-1024",
    link: "/category/irons",
    gradient: "linear-gradient(135deg, #1D976C, #93F9B9)",
  },
  {
    id: 3,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1743157199/Croma%20Assets/CMS/LP%20Page%20Banners/2025/DOTD/March/29032025/Desktop/HP_DOTD_AD_29March25_ycecfe.jpg?tr=w-1024",
    link: "/category/chargers",
    gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)",
  },
  {
    id: 4,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1743157199/Croma%20Assets/CMS/LP%20Page%20Banners/2025/DOTD/March/29032025/Desktop/HP_DOTD_AD_29March25_ycecfe.jpg?tr=w-1024",
    link: "/category/smartwatches",
    gradient: "linear-gradient(135deg, #834d9b, #d04ed6)",
  },
];

const DealsOfTheDay = () => {
  return (
    <DealsContainer>
      <Container maxWidth="lg">
        <Title variant="h2">Deals Of The Day</Title>
        <CardGrid>
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              to={deal.link}
              sx={{ background: deal.gradient }}
            >
              <CardImage
                src={deal.image}
                alt={`Deal ${deal.id}`}
                loading="lazy"
              />
            </DealCard>
          ))}
        </CardGrid>
      </Container>
    </DealsContainer>
  );
};

export default DealsOfTheDay;
