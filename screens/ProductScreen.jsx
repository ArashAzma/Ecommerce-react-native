import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableHighlight,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { fetchProduct } from "../api/productsData";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { cartContext } from "../context/cartProvider";
const ProductScreen = () => {
    const { addToCart, removeFromCart, checkCart } = useContext(cartContext);
    const route = useRoute();
    const { id } = route.params;
    const { width, height } = Dimensions.get("window");
    const [product, setProduct] = useState();
    const [inCart, setInCart] = useState(false);
    const getProduct = async () => {
        const data = await fetchProduct(id);
        if (data) {
            // console.log(data);
            setProduct(data);
            setInCart(checkCart(data));
        }
    };
    useEffect(() => {
        getProduct();
    }, [id]);
    return (
        <View style={tw`flex-1 items-center justify-center bg-white`}>
            <SafeAreaView>
                {product && (
                    <View
                        style={tw` flex-1 mt-2 justify-around items-center px-6`}
                    >
                        <Image
                            source={{ uri: product.image }}
                            style={{
                                height: height / 2,
                                width: width / 1.2,
                            }}
                            resizeMode='contain'
                        />
                        <View
                            style={{
                                ...tw` bg-white w-full flex-row p-4 justify-between rounded-t-xl shadow-2xl `,
                                height: height / 3.5,
                            }}
                        >
                            <View
                                style={tw`flex w-[72%] h-full bg-white justify-around items-center p-2`}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={tw`text-black font-bold text-5 w-full `}
                                >
                                    {product.title}
                                </Text>
                                <Text
                                    style={tw`text-black text-4 w-full`}
                                    numberOfLines={6}
                                >
                                    {product.description}
                                </Text>
                            </View>
                            <View
                                style={tw`w-[27%] h-full bg-white items-center justify-around px-2 py-4 rounded-lg shadow-md`}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={tw`text-black font-black text-5 h-[25%]`}
                                >
                                    ${product.price}
                                </Text>
                                {!inCart ? (
                                    <TouchableHighlight
                                        onPress={() => {
                                            addToCart(product);
                                            setInCart(true);
                                        }}
                                        activeOpacity={0.6}
                                        underlayColor='#0e21a0b9'
                                        style={tw`bg-[#0E21A0] h-[75%] w-full items-center justify-center rounded-lg transition `}
                                    >
                                        <>
                                            <View
                                                style={tw`p-1 border-2 border-white rounded-lg mb-2`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    style={tw`text-white`}
                                                />
                                            </View>
                                            <Text
                                                style={tw`text-white font-bold text-5 `}
                                            >
                                                Add
                                            </Text>
                                        </>
                                    </TouchableHighlight>
                                ) : (
                                    <TouchableHighlight
                                        onPress={() => {
                                            removeFromCart(product);
                                            setInCart(false);
                                        }}
                                        activeOpacity={0.6}
                                        underlayColor='#c70038a1'
                                        style={tw`bg-[#C70039] h-[75%] w-full items-center justify-center rounded-lg transition `}
                                    >
                                        <>
                                            <View
                                                style={tw`p-1 border-2 border-white rounded-lg mb-2`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMinus}
                                                    style={tw`text-white`}
                                                />
                                            </View>
                                            <Text
                                                style={tw`text-white font-bold text-4 `}
                                            >
                                                Remove
                                            </Text>
                                        </>
                                    </TouchableHighlight>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

export default ProductScreen;
