import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { fetchProduct } from "../api/productsData";
import { SafeAreaView } from "react-native-safe-area-context";
const ProductScreen = () => {
  const route = useRoute();
  const { id } = route.params;
  const [product, setProduct] = useState();
  const getProduct = async () => {
    const data = await fetchProduct(id);
    if (data) {
      console.log(data);
      setProduct(data);
    }
  };
  useEffect(() => {
    getProduct();
  }, [id]);
  return (
    <View>
      <SafeAreaView>{product && <Text>{product.title}</Text>}</SafeAreaView>
    </View>
  );
};

export default ProductScreen;
