import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Product from "./page/product";
import Navbar from "./component/Navbar";
import Signup from "./component/sign";
import LoginSignup from "./component/Login";
import Cart from "./page/Cart";
import ThanhToan from "./page/ThanhToan";
import Account from "./page/Account";


function App() {
  const [cartItems, setCartItems] = useState([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="App">
      <Router>
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={<Home handleAddToCart={handleAddToCart} />}
          />
          <Route
            path="/product"
            element={<Product handleAddToCart={handleAddToCart} />}
          />
          <Route path="/account" element={<Account />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/thanhtoan" element={<ThanhToan />} />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
