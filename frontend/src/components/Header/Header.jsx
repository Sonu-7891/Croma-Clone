import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Box,
  styled,
  alpha,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Popper,
  Paper,
  ClickAwayListener,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
  Store as StoreIcon,
  CardGiftcard as GiftIcon,
  Category as CategoryIcon,
  Tv as TvIcon,
  Home as HomeIcon,
  Smartphone as PhoneIcon,
  Computer as ComputerIcon,
  Kitchen as KitchenIcon,
  Headphones as AudioIcon,
  FitnessCenter as FitnessIcon,
  Face as GroomingIcon,
  Camera as CameraIcon,
  Stars as StarsIcon,
  Favorite,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login, register, logout } from "../../features/authSlice";
import axios from "axios";
import debounce from "lodash/debounce";

const API_URL = "http://localhost:5000/api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  color: "black",

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 320,
    backgroundColor: "#1a1a1a",
    color: "white",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

const SubMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "100%",
  top: 0,
  width: 320,
  backgroundColor: "#1a1a1a",
  color: "white",
  display: "none",
  zIndex: 1,
  height: "100%",
  ".MuiListItem-root:hover > &": {
    display: "block",
  },
}));

const StyledMenu = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: 0,
  backgroundColor: "#1a1a1a",
  color: "white",
  zIndex: 1300,
  display: "none",
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  "&.menu-open": {
    display: "block",
  },
}));

const MenuContainer = styled(Box)(({ theme }) => ({
  width: "320px",
  minHeight: "100%",
  backgroundColor: "#1a1a1a",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  position: "relative",
}));

const StyledMenuItem = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  position: "relative",
  backgroundColor: isActive ? "#00ffa3" : "transparent",
  color: isActive ? "#000" : "#fff",
  "&:hover": {
    backgroundColor: "#00ffa3",
    color: "#000",
  },
  "& .MuiSvgIcon-root": {
    marginRight: theme.spacing(2),
    fontSize: 20,
    color: "inherit",
  },
}));

const StyledSubMenuItem = styled("div")(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#00ffa3",
    color: "#000",
  },
}));

const SubMenuContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "320px",
  top: 0,
  width: "320px",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  display: "none",
  ".menu-item-active &": {
    display: "block",
  },
}));

const ProfileDropdown = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 10px)",
  right: 0,
  width: "320px",
  backgroundColor: "#1A1A1A",
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  zIndex: 1300,
  padding: theme.spacing(0),
  display: "none",
  ".profile-wrapper:hover &": {
    display: "block",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-6px",
    right: "24px",
    width: "12px",
    height: "12px",
    backgroundColor: "#1A1A1A",
    transform: "rotate(45deg)",
  },
}));

const ProfileItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "& .MuiSvgIcon-root": {
    color: "#00FFA3",
    fontSize: "24px",
  },
  "& .icon-wrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    marginRight: theme.spacing(2),
  },
}));

const ProfileDivider = styled("div")(({ theme }) => ({
  height: "1px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  margin: 0,
}));

const menuItems = [
  {
    icon: <StarsIcon />,
    text: "Exclusive At Croma",
    link: "/exclusive",
  },
  {
    icon: <CategoryIcon />,
    text: "Top Brands",
    link: "/brands",
    subItems: [
      "Amazon",
      "Atomberg",
      "Apple",
      "Bajaj",
      "Blue Star",
      "Boat",
      "Bosch",
      "Bose",
      "Canon",
      "Croma",
      "Daikin",
      "Dell",
      "Dyson",
      "Elica",
      "Faber",
      "Google",
    ],
  },
  {
    icon: <StoreIcon />,
    text: "Croma Store Locator",
    link: "/stores",
  },
  {
    icon: <GiftIcon />,
    text: "Gift Card",
    link: "/gift-card",
  },
  {
    text: "Shop by Category",
    isHeader: true,
  },
  {
    icon: <TvIcon />,
    text: "Televisions & Accessories",
    link: "/category/tv",
    subItems: [
      "Smart TVs",
      "LED TVs",
      "OLED TVs",
      "TV Stands",
      "TV Accessories",
    ],
  },
  {
    icon: <HomeIcon />,
    text: "Home Appliances",
    link: "/category/home",
    subItems: [
      "Air Conditioners",
      "Washing Machines",
      "Refrigerators",
      "Air Purifiers",
    ],
  },
  {
    icon: <PhoneIcon />,
    text: "Phones & Wearables",
    link: "/category/phones",
    subItems: [
      "Smartphones",
      "Smart Watches",
      "Tablets",
      "Headphones",
      "Accessories",
    ],
  },
  {
    icon: <ComputerIcon />,
    text: "Computers & Tablets",
    link: "/category/computers",
    subItems: [
      "Laptops",
      "Desktop PCs",
      "Monitors",
      "Printers",
      "Computer Accessories",
    ],
  },
  {
    icon: <KitchenIcon />,
    text: "Kitchen Appliances",
    link: "/category/kitchen",
    subItems: ["Microwave Ovens", "Dishwashers", "Mixers", "Coffee Makers"],
  },
  {
    icon: <AudioIcon />,
    text: "Audio & Video",
    link: "/category/audio",
    subItems: ["Speakers", "Soundbars", "Home Theater", "MP3 Players"],
  },
  {
    icon: <FitnessIcon />,
    text: "Health & Fitness",
    link: "/category/fitness",
    subItems: [
      "Fitness Trackers",
      "Treadmills",
      "Exercise Bikes",
      "Gym Equipment",
    ],
  },
  {
    icon: <GroomingIcon />,
    text: "Grooming & Personal Care",
    link: "/category/grooming",
    subItems: ["Shavers", "Trimmers", "Hair Dryers", "Styling Devices"],
  },
  {
    icon: <CameraIcon />,
    text: "Cameras & Accessories",
    link: "/category/cameras",
    subItems: [
      "DSLR Cameras",
      "Mirrorless Cameras",
      "Action Cameras",
      "Camera Lenses",
    ],
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState("");
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    keepSignedIn: false,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const menuRef = React.useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      try {
        setIsSearching(true);
        const response = await axios.get(
          `${API_URL}/products/search?query=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1e4f618583064ae49543a95faabbf252`
            );
            const city = response.data.results[0].components.city;
            setLocation(city);
          } catch (error) {
            console.error("Location error:", error);
            setLocation("Select Location");
          }
        },
        () => {
          setLocation("Select Location");
        }
      );
    }
  }, []);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSearchSelect = (productId) => {
    setSearchResults([]);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
    handleCloseMenu();
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
    setFormData({ email: "", password: "", name: "", keepSignedIn: false });
    setIsLogin(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, keepSignedIn } = formData;

    try {
      if (isLogin) {
        await dispatch(login({ email, password })).unwrap();
      } else {
        await dispatch(register({ name, email, password })).unwrap();
      }
      handleLoginDialogClose();
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemHover = (item) => {
    setActiveMenuItem(item);
  };

  const handleMenuMouseLeave = () => {
    setActiveMenuItem(null);
  };

  const handleMenuItemClick = (link) => {
    navigate(link);
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setActiveMenuItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "black" }}>
        <Toolbar sx={{ width: "80%", margin: "auto" }}>
          <RouterLink
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h1"
              noWrap
              component="div"
              sx={{
                fontFamily: "popins",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                display: { xs: "none", sm: "block" },
              }}
            >
              CROMA
            </Typography>
          </RouterLink>
          <Box sx={{ position: "relative" }} ref={menuRef}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuToggle}
              edge="start"
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>

            {menuOpen && (
              <StyledMenu className="menu-open">
                <MenuContainer>
                  {menuItems.map((item, index) =>
                    item.isHeader ? (
                      <Typography
                        key={index}
                        variant="subtitle1"
                        sx={{
                          px: 2,
                          py: 1.5,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {item.text}
                      </Typography>
                    ) : (
                      <StyledMenuItem
                        key={index}
                        isActive={activeMenuItem === item}
                        onMouseEnter={() => handleMenuItemHover(item)}
                        onClick={() => handleMenuItemClick(item.link)}
                        className={
                          activeMenuItem === item ? "menu-item-active" : ""
                        }
                      >
                        {item.icon}
                        <Typography>{item.text}</Typography>
                        {item.subItems && (
                          <ChevronRightIcon sx={{ marginLeft: "auto" }} />
                        )}
                        {item.subItems && (
                          <SubMenuContainer>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                px: 2,
                                py: 1.5,
                                fontWeight: "bold",
                                borderBottom:
                                  "1px solid rgba(255, 255, 255, 0.1)",
                              }}
                            >
                              All {item.text}
                            </Typography>
                            {item.subItems.map((subItem, subIndex) => (
                              <StyledSubMenuItem
                                key={subIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuItemClick(
                                    `${item.link}/${subItem
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`
                                  );
                                }}
                              >
                                <Typography>{subItem}</Typography>
                              </StyledSubMenuItem>
                            ))}
                          </SubMenuContainer>
                        )}
                      </StyledMenuItem>
                    )
                  )}
                </MenuContainer>
              </StyledMenu>
            )}
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {(searchResults.length > 0 || isSearching) && (
              <Popper
                open={true}
                anchorEl={document.querySelector(".MuiInputBase-root")}
                placement="bottom-start"
                style={{ width: "100%", zIndex: 1300 }}
              >
                <ClickAwayListener onClickAway={() => setSearchResults([])}>
                  <Paper
                    elevation={3}
                    sx={{ mt: 1, maxHeight: 400, overflow: "auto" }}
                  >
                    {isSearching ? (
                      <Box
                        sx={{ p: 2, display: "flex", justifyContent: "center" }}
                      >
                        <CircularProgress size={24} />
                      </Box>
                    ) : (
                      searchResults.map((product) => (
                        <MenuItem
                          key={product._id}
                          onClick={() => handleSearchSelect(product._id)}
                        >
                          {product.name}
                        </MenuItem>
                      ))
                    )}
                  </Paper>
                </ClickAwayListener>
              </Popper>
            )}
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 2,
                cursor: "pointer",
              }}
            >
              <LocationIcon sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {location}
              </Typography>
            </Box>

            <Box
              className="profile-wrapper"
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ml: 2,
              }}
            >
              <IconButton size="large" color="inherit">
                <PersonIcon />
              </IconButton>

              <ProfileDropdown>
                {isAuthenticated ? (
                  <>
                    <ProfileItem component={RouterLink} to="/profile">
                      <span className="icon-wrapper">
                        <PersonIcon />
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Profile
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Edit your basic details
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/addresses">
                      <span className="icon-wrapper">
                        <LocationIcon />
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Address
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Manage your saved addresses
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/orders">
                      <span className="icon-wrapper">
                        <Box component="span" sx={{ display: "flex" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 8H4C3.45 8 3 8.45 3 9V19C3 19.55 3.45 20 4 20H20C20.55 20 21 19.55 21 19V9C21 8.45 20.55 8 20 8ZM19 19H5C4.45 19 4 18.55 4 18V10C4 9.45 4.45 9 5 9H19C19.55 9 20 9.45 20 10V18C20 18.55 19.55 19 19 19Z"
                              fill="#00FFA3"
                            />
                            <path d="M16 12H8V14H16V12Z" fill="#00FFA3" />
                          </svg>
                        </Box>
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Orders
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          View, track, cancel orders and buy again
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/privilege">
                      <span className="icon-wrapper">
                        <Box component="span" sx={{ display: "flex" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                              fill="#00FFA3"
                            />
                          </svg>
                        </Box>
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Privilege Offers
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Exclusive offers for you
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/wishlist">
                      <span className="icon-wrapper">
                        <Favorite sx={{ color: "#00FFA3" }} />
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Wishlist
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Have a look at your favourite products
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/devices">
                      <span className="icon-wrapper">
                        <Box component="span" sx={{ display: "flex" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 6H20V16H4V6Z"
                              stroke="#00FFA3"
                              strokeWidth="2"
                            />
                            <path
                              d="M6 18H18"
                              stroke="#00FFA3"
                              strokeWidth="2"
                            />
                          </svg>
                        </Box>
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Devices & Plans
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Manage your devices and plans
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem component={RouterLink} to="/service">
                      <span className="icon-wrapper">
                        <Box component="span" sx={{ display: "flex" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                              fill="#00FFA3"
                            />
                          </svg>
                        </Box>
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          My Service Requests
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Manage complaints, feedback, service requests
                        </Typography>
                      </Box>
                    </ProfileItem>
                    <ProfileDivider />
                    <ProfileItem onClick={handleLogout}>
                      <span className="icon-wrapper">
                        <Box component="span" sx={{ display: "flex" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z"
                              fill="#00FFA3"
                            />
                          </svg>
                        </Box>
                      </span>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: "#fff", fontWeight: 500 }}
                        >
                          Logout
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                        >
                          Sign out from your account
                        </Typography>
                      </Box>
                    </ProfileItem>
                  </>
                ) : (
                  <ProfileItem onClick={handleLoginDialogOpen}>
                    <span className="icon-wrapper">
                      <PersonIcon />
                    </span>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ color: "#fff", fontWeight: 500 }}
                      >
                        Login
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255, 255, 255, 0.6)" }}
                      >
                        Access your account
                      </Typography>
                    </Box>
                  </ProfileItem>
                )}
              </ProfileDropdown>
            </Box>

            <IconButton
              size="large"
              aria-label="show cart items"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={0} color="secondary">
                <CartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <StyledDrawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
      >
        <List>
          {menuItems.map((item, index) =>
            item.isHeader ? (
              <Typography
                key={index}
                variant="subtitle1"
                sx={{ px: 2, py: 1, fontWeight: "bold" }}
              >
                {item.text}
              </Typography>
            ) : (
              <StyledListItem
                key={index}
                component={RouterLink}
                to={item.link}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                sx={{ position: "relative" }}
              >
                {item.icon && (
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                )}
                <ListItemText primary={item.text} />
                {item.subItems && <ChevronRightIcon />}

                {item.subItems && hoveredItem === item && (
                  <SubMenu>
                    <List>
                      <Typography
                        variant="subtitle1"
                        sx={{ px: 2, py: 1, fontWeight: "bold" }}
                      >
                        All {item.text}
                      </Typography>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItem
                          key={subIndex}
                          component={RouterLink}
                          to={`${item.link}/${subItem
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          sx={{
                            "&:hover": {
                              backgroundColor: alpha("#fff", 0.1),
                            },
                          }}
                        >
                          <ListItemText primary={subItem} />
                        </ListItem>
                      ))}
                    </List>
                  </SubMenu>
                )}
              </StyledListItem>
            )
          )}
        </List>
      </StyledDrawer>

      <StyledDialog
        open={loginDialogOpen}
        onClose={handleLoginDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {isLogin ? "Login" : "Create Account"}
            </Typography>
            <IconButton onClick={handleLoginDialogClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please enter your Email ID or Phone number
            </Typography>
            {!isLogin && (
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                margin="normal"
                required
              />
            )}
            <TextField
              fullWidth
              label="Email ID or Phone number"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.keepSignedIn}
                  onChange={(e) =>
                    setFormData({ ...formData, keepSignedIn: e.target.checked })
                  }
                  color="primary"
                />
              }
              label="Keep me signed in"
            />
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              By continuing you agree to our{" "}
              <Link href="#" underline="hover">
                Terms of Use
              </Link>{" "}
              &{" "}
              <Link href="#" underline="hover">
                Privacy Policy
              </Link>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Create one" : "Login"}
                </Link>
              </Typography>
            </Box>
          </form>
        </DialogContent>
      </StyledDialog>
    </Box>
  );
};

export default Header;
