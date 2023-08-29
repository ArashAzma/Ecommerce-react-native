import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons/faBasketShopping";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cartContext } from "../context/cartProvider";

const Header = () => {
    const navigation = useNavigation();
    const { cart } = useContext(cartContext);
    return (
        <View style={tw`flex-row w-full justify-between items-center mt-6`}>
            <SafeAreaView
                style={tw`flex-row w-full justify-between items-center p-2 px-6`}
            >
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={tw`text-2xl font-bold`}>Arash Shop</Text>
                </Pressable>
                <View>
                    <Pressable onPress={() => navigation.navigate("Cart")}>
                        <FontAwesomeIcon icon={faBasketShopping} size={26} />
                    </Pressable>
                    {cart.length > 0 && (
                        <View style={tw`flex-row absolute -right-3`}>
                            <FontAwesomeIcon
                                icon={faCircle}
                                size={22}
                                style={tw`text-red-600`}
                            />
                            <Text style={tw` absolute  text-white right-1.3 `}>
                                {cart.length}
                            </Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Header;
