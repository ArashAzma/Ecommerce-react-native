import { View, Text, Pressable, FlatList } from "react-native";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { cartContext } from "../context/cartProvider";
import CartItemCard from "../components/CartItemCard";

const CartScreen = () => {
    const navigation = useNavigation();
    const { cart } = useContext(cartContext);
    return (
        <View style={tw`flex-1 bg-white  `}>
            <SafeAreaView style={tw`flex-1 items-center mt-8`}>
                <Pressable
                    style={tw`w-full  opacity-60 px-8
                    `}
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={24}
                        style={tw`w-full 
                    `}
                    />
                </Pressable>
                <View style={tw`flex-row w-full mt-8 mb-4 px-8`}>
                    <Text style={tw`text-2xl mr-1`}>Shopping cart</Text>
                    <View>
                        <FontAwesomeIcon icon={faCircle} size={22} />
                        <Text
                            style={tw`text-lg absolute text-white right-1.5 -top-1`}
                        >
                            {cart.length}
                        </Text>
                    </View>
                </View>
                <View style={tw`w-full h-[80%] px-8`}>
                    <FlatList
                        data={cart}
                        contentContainerStyle={tw`pb-3`}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={tw`h-4`}></View>
                        )}
                        renderItem={(item) => (
                            <CartItemCard product={item.item} key={item.id} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default CartScreen;
