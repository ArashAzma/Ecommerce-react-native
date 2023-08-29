import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { cartContext } from "../context/cartProvider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";

import tw from "twrnc";
const ProductCard = ({ item }) => {
    const [inCart, setInCart] = useState(false);
    const { title, image, price } = item;
    const { width, height } = Dimensions.get("window");
    const { checkCart, addToCart, removeFromCart } = useContext(cartContext);
    useEffect(() => {
        setInCart(checkCart(item));
    }, [addToCart || removeFromCart]);
    return (
        <View
            style={[
                tw`bg-white py-6 px-4 items-center justify-center rounded-lg shadow-sm`,
                { maxWidth: width / 2.3 },
            ]}>
            <Image
                source={{ uri: image }}
                style={[tw`mb-2 w-full `, { height: width / 2.8 }]}
                resizeMode='contain'
            />
            <Text style={tw`font-semibold text-4`}>{title}</Text>
            <View style={tw`flex-row w-full justify-start mt-4 items-center`}>
                <Text style={tw`font-bold text-lg mr-2`}>${price}</Text>
                <Text style={[tw``, { textDecorationLine: "line-through" }]}>
                    {price * 2}
                </Text>
            </View>
            {!inCart ? (
                <TouchableOpacity
                    onPress={() => {
                        addToCart(item);
                        setInCart(true);
                    }}
                    style={tw`absolute bg-emerald-400  p-2 top-4 right-4 rounded-full shadow-lg`}>
                    <FontAwesomeIcon icon={faPlus} style={tw`text-white`} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => {
                        removeFromCart(item);
                        setInCart(false);
                    }}
                    style={tw`absolute bg-red-600  p-2 top-4 right-4 rounded-full shadow-lg`}>
                    <FontAwesomeIcon icon={faMinus} style={tw`text-white`} />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProductCard;
