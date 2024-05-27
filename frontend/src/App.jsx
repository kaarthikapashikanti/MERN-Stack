import React, { useState } from "react";
import Navbar from "./components/navbar/navbar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Cart from "./pages/cart/cart.jsx";
import PlaceOrder from "./pages/placeOrder/placeOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopup from "./components/LoginPopup/LoginPopup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordResetRequest from "./components/LoginPopup/PasswordResetRequest.jsx";
import PasswordReset from "./components/LoginPopup/PasswordReset.jsx";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/myorders/MyOrders.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/password-reset-request"
            element={<PasswordResetRequest />}
          />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
