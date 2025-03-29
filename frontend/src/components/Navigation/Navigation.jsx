import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Laptop as LaptopIcon,
  PhoneAndroid as PhoneIcon,
  Headphones as HeadphonesIcon,
  Watch as WatchIcon,
  CameraAlt as CameraIcon,
  Tv as TvIcon,
  Kitchen as KitchenIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: "#fff",
  borderBottom: "1px solid #e0e0e0",
  padding: theme.spacing(0),
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  color: "#333",
  textTransform: "none",
  padding: theme.spacing(1, 2),
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const categories = [
  {
    name: "Electronics",
    icon: <LaptopIcon />,
    subcategories: ["Laptops", "Tablets", "Accessories"],
  },
  {
    name: "Mobile",
    icon: <PhoneIcon />,
    subcategories: ["Smartphones", "Cases", "Chargers"],
  },
  {
    name: "Audio",
    icon: <HeadphonesIcon />,
    subcategories: ["Headphones", "Speakers", "Earphones"],
  },
  {
    name: "Wearables",
    icon: <WatchIcon />,
    subcategories: ["Smartwatches", "Fitness Bands"],
  },
  {
    name: "Cameras",
    icon: <CameraIcon />,
    subcategories: ["DSLR", "Mirrorless", "Action Cameras"],
  },
  {
    name: "TVs",
    icon: <TvIcon />,
    subcategories: ["Smart TVs", "LED TVs", "OLED TVs"],
  },
  {
    name: "Appliances",
    icon: <KitchenIcon />,
    subcategories: ["Refrigerators", "Washing Machines", "ACs"],
  },
];

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <StyledToolbar>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          {categories.map((category) => (
            <React.Fragment key={category.name}>
              <CategoryButton
                startIcon={category.icon}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(e) => handleMenuOpen(e, category)}
              >
                {category.name}
              </CategoryButton>
              <Menu
                anchorEl={anchorEl}
                open={
                  Boolean(anchorEl) && selectedCategory?.name === category.name
                }
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 200,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <MenuItem
                    key={subcategory}
                    component={Link}
                    to={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                    onClick={handleMenuClose}
                  >
                    <Typography variant="body2">{subcategory}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </React.Fragment>
          ))}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navigation;
