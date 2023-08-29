import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const cartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const getCart = async () => {
        const value = await AsyncStorage.getItem("@Cart");
        if (value) {
            setCart(JSON.parse(value));
        }
        console.log("GOT CART");
    };
    const changeCart = async (items) => {
        await AsyncStorage.setItem("@Cart", JSON.stringify(items));
        console.log("CHANGED");
    };
    useEffect(() => {
        getCart();
    }, []);
    const addToCart = (item) => {
        const temp = [item, ...cart];
        changeCart(temp);
        setCart(temp);
    };
    const removeFromCart = (item) => {
        const temp = cart.filter((product) => product.id !== item.id);
        changeCart(temp);
        setCart(temp);
    };
    const checkCart = (product) => {
        const isInCart = cart.some((item) => {
            return product.id === item.id;
        });
        return isInCart;
    };
    return (
        <cartContext.Provider
            value={{ cart, addToCart, removeFromCart, checkCart }}
        >
            {children}
        </cartContext.Provider>
    );
};

export default CartProvider;
