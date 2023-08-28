import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import tw from "twrnc";
const ProductCard = ({ item }) => {
  const { title, description, image, price } = item;
  const { width, height } = Dimensions.get("window");
  return (
    <View
      style={[
        tw`bg-white py-6 px-4 items-center justify-center rounded-lg shadow-sm`,
        { maxWidth: width / 2.2 },
      ]}
    >
      <Image
        source={{ uri: image }}
        style={[tw`mb-2 w-full `, { height: width / 2.7 }]}
        resizeMode="contain"
      />
      <Text style={tw`font-semibold text-4`}>{title}</Text>
      <View style={tw`flex-row w-full justify-start mt-4 items-center`}>
        <Text style={tw`font-bold text-lg mr-2`}>${price}</Text>
        <Text style={[tw``, { textDecorationLine: "line-through" }]}>
          {price * 2}
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
