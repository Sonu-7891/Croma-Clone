import React, { useState } from "react";
import {
  Box,
  Typography,
  styled,
  IconButton,
  Container,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CategoryContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(4, 0),
  overflow: "hidden",
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  margin: "0 auto",
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  transition: "transform 0.3s ease",
  width: "100%",
  overflow: "hidden",
}));

const CategoryItem = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#fff",
  width: "calc(100% / 8)",
  minWidth: "calc(100% / 8)",
  padding: theme.spacing(1),
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const CategoryCard = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #2D2D54 0%, #1a1a38 100%)",
  borderRadius: "12px",
  padding: theme.spacing(2),
  height: "140px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #3D3D64 0%, #2a2a48 100%)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

const categoryData = [
  {
    id: 1,
    name: "Mobiles",
    link: "/category/mobiles",
  },
  {
    id: 2,
    name: "Televisions",
    link: "/category/televisions",
  },
  {
    id: 3,
    name: "Laptops",
    link: "/category/laptops",
  },
  {
    id: 4,
    name: "Audio",
    link: "/category/audio",
  },
  {
    id: 5,
    name: "Cameras",
    link: "/category/cameras",
  },
  {
    id: 6,
    name: "Gaming",
    link: "/category/gaming",
  },
  {
    id: 7,
    name: "Appliances",
    link: "/category/appliances",
  },
  {
    id: 8,
    name: "Wearables",
    link: "/category/wearables",
  },
  // Second slide
  {
    id: 9,
    name: "Tablets",
    link: "/category/tablets",
  },
  {
    id: 10,
    name: "Smart Home",
    link: "/category/smart-home",
  },
  {
    id: 11,
    name: "Accessories",
    link: "/category/accessories",
  },
  {
    id: 12,
    name: "Kitchen",
    link: "/category/kitchen",
  },
  {
    id: 13,
    name: "Grooming",
    link: "/category/grooming",
  },
  {
    id: 14,
    name: "Health",
    link: "/category/health",
  },
  {
    id: 15,
    name: "Storage",
    link: "/category/storage",
  },
  {
    id: 16,
    name: "Networking",
    link: "/category/networking",
  },
];

const ProductCategories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(null);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (startX) {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      }
    }
  };

  const currentCategories = categoryData.slice(
    currentSlide * 8,
    (currentSlide + 1) * 8
  );

  return (
    <CategoryContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "#fff", mb: 4, ml: 2 }}>
          Shop By Category
        </Typography>

        <SliderContainer
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <NavigationButton
            onClick={handlePrevSlide}
            sx={{ left: { xs: -8, md: -40 } }}
          >
            <ChevronLeft />
          </NavigationButton>

          <SliderWrapper
            sx={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <Box sx={{ display: "flex", width: "100%" }}>
              {currentCategories.map((category) => (
                <CategoryItem key={category.id} to={category.link}>
                  <CategoryCard>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.875rem",
                      }}
                    >
                      View All
                    </Typography>
                  </CategoryCard>
                </CategoryItem>
              ))}
            </Box>
          </SliderWrapper>

          <NavigationButton
            onClick={handleNextSlide}
            sx={{ right: { xs: -8, md: -40 } }}
          >
            <ChevronRight />
          </NavigationButton>
        </SliderContainer>
      </Container>
    </CategoryContainer>
  );
};

export default ProductCategories;
