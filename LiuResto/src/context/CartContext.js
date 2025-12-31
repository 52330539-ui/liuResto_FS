import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const API_URL = "http://localhost:5000";

  // Fetch cart and map pname to name
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      const mappedCart = res.data.map(item => ({
        name: item.pname, // map pname to name
        price: item.price
      }));
      setCartItems(mappedCart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    try {
      await axios.post(`${API_URL}/cart/add`, item);
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (name) => {
    try {
      await axios.delete(`${API_URL}/cart/remove/${name}`);
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart/clear`);
      fetchCart(); // refresh cart
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
