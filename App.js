import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./components/AppNavigation";
import CartProvider from "./context/cartProvider";
import {
  useFonts,
  Lora_700Bold,
  Lora_500Medium,
  Lora_600SemiBold,
  Lora_400Regular,
} from "@expo-google-fonts/lora";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Lora_700Bold,
    Lora_500Medium,
    Lora_600SemiBold,
    Lora_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <CartProvider>
      <AppNavigation />
    </CartProvider>
  );
}
