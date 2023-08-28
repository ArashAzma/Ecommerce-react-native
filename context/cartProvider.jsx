import { View, Text } from "react-native";
import React, { createContext, useEffect, useState } from "react";

export const cartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => {
    const temp = [item, ...cart];
    setCart(temp);
  };
  const removeFromCart = (item) => {
    const temp = cart.filter((product) => product.id !== item.id);
    setCart(temp);
  };
  return (
    <cartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
