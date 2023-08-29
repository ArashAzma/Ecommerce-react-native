import { View, Text, Dimensions, Image, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import React, { useContext } from "react";
import tw from "twrnc";
import { cartContext } from "../context/cartProvider";
const CartItemCard = ({ product }) => {
    const { removeFromCart } = useContext(cartContext);
    const { image, title, price } = product;
    const { width, height } = Dimensions.get("window");
    return (
        <View
            style={tw`flex-row w-full bg-white p-6 items-center gap-x-6 rounded-xl shadow-md max-h-40`}
        >
            <Image
                source={{ uri: image }}
                style={{
                    height: height / 8,
                    width: width / 6,
                }}
                resizeMode='contain'
            />
            <Text style={tw`max-w-30`} numberOfLines={4}>
                {title}
            </Text>
            <View style={tw` absolute bottom-3 right-6 `}>
                <Text style={tw`text-xl font-semibold`}> ${price}</Text>
            </View>
            <Pressable
                style={tw`absolute top-8 right-6`}
                onPress={() => removeFromCart(product)}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    size={20}
                    style={tw`w-full 
                    `}
                />
            </Pressable>
        </View>
    );
};

export default CartItemCard;
