import React, { useState } from "react";
import { Box, Container, IconButton, styled } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

const TopBrandsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundColor: "#000000",
  position: "relative",
}));

const SliderContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",

//   margin: "0 40px",
}));

const SliderTrack = styled(Box)(({ theme }) => ({
  display: "flex",
  transition: "transform 0.3s ease-in-out",
}));

const BrandCard = styled(Link)(({ theme }) => ({
  flex: "0 0 20%",
    // padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1A1A1A",
  borderRadius: "8px",
  margin: "0 27px",
  transition: "transform 0.3s ease",
  textDecoration: "none",
  aspectRatio: "16/9",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  [theme.breakpoints.down("md")]: {
    flex: "0 0 33.333%",
  },
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 50%",
  },
}));

const BrandLogo = styled("img")({
 
  borderRadius: "8px",
  objectFit: "contain",
});

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  zIndex:9999,
  transform: "translateY(-50%)",
  color: "#fff",
  zIndex: 1,
}));

const brands = [
  {
    id: 1,
    name: "Apple",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/13_fbzbpw.png?tr=w-720",
    link: "/brand/apple",
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/2_bki1il.png?tr=w-720",
    link: "/brand/samsung",
  },

  {
    id: 3,
    name: "Sony",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/14_xtc6jg.png?tr=w-720",
    link: "/brand/sony",
  },
  {
    id: 4,
    name: "Oppo",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/3_voajbz.png?tr=w-720",
    link: "/brand/lg",
  },
  {
    id: 5,
    name: "Philips",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/1_maspxu.png?tr=w-720",
    link: "/brand/philips",
  },
  
  {
    id: 7,
    name: "Dell",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/7_uvvozm.png?tr=w-720",
    link: "/brand/dell",
  },
  {
    id: 8,
    name: "HP",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/5_pjm9wd.png?tr=w-720",
    link: "/brand/hp",
  },
  {
    id: 9,
    name: "Lenovo",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/4_wmg1qj.png?tr=w-720",
    link: "/brand/lenovo",
  },
 
  {
    id: 11,
    name: "Bose",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/12_hfsle3.png?tr=w-720",
    link: "/brand/bose",
  },
  {
    id: 12,
    name: "JBL",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/11_tc1idk.png?tr=w-720",
    link: "/brand/jbl",
  },
  {
    id: 13,
    name: "Xiaomi",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682983/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/9_rqohp4.png?tr=w-720",
    link: "/brand/xiaomi",
  },
  {
    id: 14,
    name: "OnePlus",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682982/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/6_cruwwo.png?tr=w-720",
    link: "/brand/oneplus",
  },
  {
    id: 15,
    name: "Vivo",
    logo: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1727682981/Croma%20Assets/CMS/Brand%20Logos/2024/Brands%20Icons/30092024/Brands%20Logo/Brands%20Logo/Desktop/10_iobxyi.png?tr=w-720",
    link: "/brand/vivo",
  },
];

const TopBrands = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(brands.length / 5);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  return (
    <TopBrandsContainer>
      <Box sx={{ width: "72%", margin: "0 auto" }}>
        <Box sx={{ position: "absolute", left:"12.5%", top: "50%" }}>
          <NavigationButton onClick={handlePrevSlide} sx={{ left: -20 }}>
            <ChevronLeft />
          </NavigationButton>
        </Box>
        <SliderContainer>
          <SliderTrack
            sx={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {brands.map((brand) => (
              <BrandCard key={brand.id} to={brand.link}>
                <BrandLogo src={brand.logo} alt={brand.name} loading="lazy" />
              </BrandCard>
            ))}
          </SliderTrack>
        </SliderContainer>
        <Box sx={{ position: "absolute",left: "87.5%", top: "50%" }}>
          <NavigationButton onClick={handleNextSlide} sx={{ right: -20 }}>
            <ChevronRight />
          </NavigationButton>
        </Box>
      </Box>
    </TopBrandsContainer>
  );
};

export default TopBrands;
