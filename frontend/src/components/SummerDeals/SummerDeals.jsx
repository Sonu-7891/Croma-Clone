import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  styled,
  Rating,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const DealsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  padding: theme.spacing(4, 0),
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: theme.spacing(4, 0),
}));

const SliderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  transition: "transform 0.3s ease-in-out",
  width: "100%",
  overflow: "hidden",
}));

const SlideTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  transition: "transform 0.3s ease-in-out",
}));

const ProductCard = styled(Card)(({ theme }) => ({
  flex: "0 0 calc(25% - 16px)",
  maxWidth: "calc(25% - 16px)",
  backgroundColor: "#000",
  backgroundColor: "#1A1A1A",
  borderRadius: "8px",
  position: "relative",
  "&:hover": {
    transform: "translateY(-4px)",
    transition: "transform 0.2s ease-in-out",
  },
}));

const WishlistButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  color: "#fff",
  zIndex: 1,
  "&:hover": {
    color: "#ff4081",
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 200,

  backgroundSize: "contain",
  backgroundColor: "#fff",
  padding: theme.spacing(2),
}));

const ProductInfo = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  color: "#fff",
}));

const PriceInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: "line-through",
  color: "#888",
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  zIndex: 1,
}));

const products = [
  {
    id: 1,
    name: "Croma 7 in 1 Convertible 1 Ton 3 Star Inverter Split AC",
    price: "₹28,990.00",
    originalPrice: "₹37,000.00",
    rating: 5,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 2,
    name: "Croma 30 Litres Tower Air Cooler with Evaporative Technology",
    price: "₹7,999.00",
    originalPrice: "₹10,000.00",
    rating: 5,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 3,
    name: "Croma 7 in 1 Convertible 1.5 Ton 3 Star Inverter Split AC",
    price: "₹31,990.00",
    originalPrice: "₹42,000.00",
    rating: 4,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 4,
    name: "Croma 40 Litres Personal Air Cooler with Inverter Technology",
    price: "₹6,499.00",
    originalPrice: "₹11,500.00",
    rating: 4,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 5,
    name: "Croma 2 Ton Window AC",
    price: "₹32,990.00",
    originalPrice: "₹45,000.00",
    rating: 5,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 6,
    name: "Croma 55L Desert Air Cooler",
    price: "₹9,999.00",
    originalPrice: "₹14,000.00",
    rating: 4,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 7,
    name: "Croma 1.5 Ton Portable AC",
    price: "₹34,990.00",
    originalPrice: "₹48,000.00",
    rating: 5,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
  {
    id: 8,
    name: "Croma 20L Personal Cooler",
    price: "₹5,999.00",
    originalPrice: "₹8,500.00",
    rating: 4,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1741356999/311918_0_f4kxwv.png?tr=w-480",
  },
];

const SummerDeals = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wishlist, setWishlist] = useState({});

  const totalSlides = Math.ceil(products.length / 4);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Get current slide's products
  const getCurrentSlideProducts = () => {
    const startIndex = currentSlide * 4;
    return products.slice(startIndex, startIndex + 4);
  };

  return (
    <DealsContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
          Summer Special Deals
        </Typography>

        <SliderContainer>
          <NavigationButton
            onClick={handlePrevSlide}
            sx={{ left: { xs: -8, md: -40 } }}
          >
            <ChevronLeft />
          </NavigationButton>

          <Box sx={{ overflow: "hidden" }}>
            <SliderWrapper>
              <SlideTrack
                sx={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${totalSlides * 100}%`,
                }}
              >
                {getCurrentSlideProducts().map((product) => (
                  <ProductCard
                    key={product.id}
                    component={Link}
                    to={`/product/${product.id}`}
                  >
                    <WishlistButton
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                    >
                      {wishlist[product.id] ? <Favorite /> : <FavoriteBorder />}
                    </WishlistButton>
                    <ProductImage
                      component="img"
                      backgroundColor={"black"}
                      image={product.image}
                      alt={product.name}
                    />
                    <ProductInfo>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "1rem", mb: 1, minHeight: "3rem" }}
                      >
                        {product.name}
                      </Typography>
                      <PriceInfo>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {product.price}
                        </Typography>
                        <OriginalPrice variant="body2">
                          {product.originalPrice}
                        </OriginalPrice>
                      </PriceInfo>
                      <Rating
                        value={product.rating}
                        readOnly
                        sx={{
                          mt: 1,
                          "& .MuiRating-iconFilled": {
                            color: "#30EFB0",
                          },
                        }}
                      />
                    </ProductInfo>
                  </ProductCard>
                ))}
              </SlideTrack>
            </SliderWrapper>
          </Box>

          <NavigationButton
            onClick={handleNextSlide}
            sx={{ right: { xs: -8, md: -25 } }}
          >
            <ChevronRight />
          </NavigationButton>
        </SliderContainer>
      </Container>
    </DealsContainer>
  );
};

export default SummerDeals;
