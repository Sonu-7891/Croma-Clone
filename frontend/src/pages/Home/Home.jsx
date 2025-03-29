import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  styled,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProductCategories from "../../components/ProductCategories/ProductCategories";
import BankOffers from "../../components/BankOffers/BankOffers";
import LimitedTimeOffer from "../../components/LimitedTimeOffer/LimitedTimeOffer";
import SummerDeals from "../../components/SummerDeals/SummerDeals";
import Footer from "../../components/Footer/Footer";
import DealsOfTheDay from "../../components/DealsOfTheDay/DealsOfTheDay";
import CromaApplianse from "../../components/cromaaaplianse/CromaApplianse";
import WhyCroma from "../../components/WhyCroma/WhyCroma";
import TopBrands from "../../components/TopBrands/TopBrands";

const BannerSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& img": {
    width: "100%",
    height: "auto",
    borderRadius: theme.shape.borderRadius,
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4],
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: "100%",
  position: "relative",
  "& img": {
    objectFit: "contain",
    padding: theme.spacing(1),
  },
}));

const Price = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: "1.25rem",
}));

const Discount = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  marginLeft: theme.spacing(1),
  textDecoration: "line-through",
}));

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    image:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1725959433/Croma%20Assets/Communication/Mobiles/Images/309695_0_hpoykn.png?tr=w-640",
    category: "Smartphones",
  },
  {
    id: 2,
    name: "MacBook Pro M1",
    price: 1299.99,
    originalPrice: 1499.99,
    image: "https://via.placeholder.com/300",
    category: "Laptops",
  },
  {
    id: 3,
    name: "Sony WH-1000XM4",
    price: 349.99,
    originalPrice: 399.99,
    image: "https://via.placeholder.com/300",
    category: "Headphones",
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 4",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://via.placeholder.com/300",
    category: "Wearables",
  },
];

const SlideShowContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
  backgroundColor: "#aa0",
}));

const Slide = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 100,
  width: "100%",
  height: "100%",
  opacity: 0,
  transition: "opacity 0.5s ease-in-out",
  "&.active": {
    opacity: 1,
  },
}));

const SlideImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50px",
  transform: "translateY(-50%)",
  color: "#fff",
  zIndex: 2,
  ml: 10,
  [theme.breakpoints.down("md")]: {
    left: "20px",
  },
}));

const SlideNavigation = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "10px",
  zIndex: 2,
}));

const NavDot = styled(Box)(({ theme, active }) => ({
  width: "100px",
  height: "4px",
  // borderRadius: "50%",
  backgroundColor: active
    ? theme.palette.primary.main
    : "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  color: "#fff",
  zIndex: 2,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
}));

const slides = [
  {
    id: 1,
    image: "/imagesiphone-16.jpg",
    title: "iPhone 16",
    subtitle: "128GB",
    price: "₹67,490",
    originalPrice: "₹79,900",
    buttonText: "Shop now",
    link: "/product/iphone-16",
  },
  {
    id: 2,
    image: "/images/samsung-tv.jpg",
    title: "Samsung Neo QLED",
    subtitle: "Experience Real Colors",
    price: "₹89,990",
    originalPrice: "₹1,19,900",
    buttonText: "Explore Now",
    link: "/category/tv",
  },
  {
    id: 3,
    image: "/images/macbook.jpg",
    title: "MacBook Pro",
    subtitle: "With M3 Chip",
    price: "₹1,29,990",
    originalPrice: "₹1,49,900",
    buttonText: "Buy Now",
    link: "/category/computers/laptops",
  },
  {
    id: 4,
    image: "/images/airpods.jpg",
    title: "AirPods Pro",
    subtitle: "2nd Generation",
    price: "₹24,990",
    originalPrice: "₹27,900",
    buttonText: "Add to Cart",
    link: "/category/audio",
  },
  {
    id: 5,
    image: "/images/samsung-fold.jpg",
    title: "Samsung Galaxy Z Fold 5",
    subtitle: "Unfold Next-Level Experience",
    price: "₹1,54,990",
    originalPrice: "₹1,84,900",
    buttonText: "Pre-Order Now",
    link: "/category/phones",
  },
  {
    id: 6,
    image: "/images/ps5.jpg",
    title: "PlayStation 5",
    subtitle: "Gaming Without Limits",
    price: "₹49,990",
    originalPrice: "₹54,900",
    buttonText: "Game On",
    link: "/category/gaming",
  },
  {
    id: 7,
    image: "/images/smart-home.jpg",
    title: "Smart Home Bundle",
    subtitle: "Transform Your Home",
    price: "₹29,990",
    originalPrice: "₹39,900",
    buttonText: "Upgrade Now",
    link: "/category/smart-home",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <Box>
      <SlideShowContainer>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            className={index === currentSlide ? "active" : ""}
          >
            <SlideImage src={slide.image} alt={slide.title} />
            <SlideContent>
              <Typography variant="h2" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {slide.subtitle}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Typography variant="h3">{slide.price}</Typography>
                <Typography
                  variant="h5"
                  sx={{ textDecoration: "line-through", opacity: 0.7 }}
                >
                  {slide.originalPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to={slide.link}
                sx={{
                  backgroundColor: "#00ffa3",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#00cc82",
                  },
                }}
              >
                {slide.buttonText}
              </Button>
            </SlideContent>
          </Slide>
        ))}

        <NavigationButton
          sx={{ left: 20 }}
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </NavigationButton>
        <NavigationButton
          sx={{ right: 20 }}
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight />
        </NavigationButton>

        <SlideNavigation>
          {slides.map((_, index) => (
            <NavDot
              key={index}
              active={index === currentSlide}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </SlideNavigation>
      </SlideShowContainer>

      <ProductCategories />
      <BankOffers />
      <LimitedTimeOffer />
      <SummerDeals />
      <CromaApplianse />
      <DealsOfTheDay />
      <SlideShowContainer>
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            className={index === currentSlide ? "active" : ""}
          >
            <SlideImage src={slide.image} alt={slide.title} />
            <SlideContent>
              <Typography variant="h2" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {slide.subtitle}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Typography variant="h3">{slide.price}</Typography>
                <Typography
                  variant="h5"
                  sx={{ textDecoration: "line-through", opacity: 0.7 }}
                >
                  {slide.originalPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to={slide.link}
                sx={{
                  backgroundColor: "#00ffa3",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#00cc82",
                  },
                }}
              >
                {slide.buttonText}
              </Button>
            </SlideContent>
          </Slide>
        ))}

        <NavigationButton
          sx={{ left: 20 }}
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </NavigationButton>
        <NavigationButton
          sx={{ right: 20 }}
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight />
        </NavigationButton>

        <SlideNavigation>
          {slides.map((_, index) => (
            <NavDot
              key={index}
              active={index === currentSlide}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </SlideNavigation>
      </SlideShowContainer>
      <WhyCroma />
      <TopBrands />
      <Footer />
    </Box>
  );
};

export default Home;
