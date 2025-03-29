import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import { store } from "./features/store";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart/Cart";
import ProductDetail from "./pages/Product/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Addresses from "./pages/Addresses";
import Devices from "./pages/Devices";
import ServiceRequests from "./pages/ServiceRequests";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <main style={{ flex: 1, padding: "20px 0" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route
                  path="/exclusive"
                  element={<CategoryPage type="exclusive" />}
                />
                <Route
                  path="/brands/*"
                  element={<CategoryPage type="brands" />}
                />
                <Route
                  path="/stores"
                  element={<CategoryPage type="stores" />}
                />
                <Route
                  path="/gift-card"
                  element={<CategoryPage type="gift-card" />}
                />
                <Route
                  path="/category/:category/*"
                  element={<CategoryPage />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/devices" element={<Devices />} />
                <Route path="/service" element={<ServiceRequests />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
