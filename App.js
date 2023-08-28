import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import CartProvider from "./context/cartProvider";

export default function App() {
  return (
    <CartProvider>
      <AppNavigation />
    </CartProvider>
  );
}
