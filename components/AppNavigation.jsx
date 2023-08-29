import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "./../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import Header from "./Header";

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerStyle: {
                        shadowOpacity: 0,
                    },
                }}
            >
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ header: (props) => <Header {...props} /> }}
                />
                <Stack.Screen
                    name='Product'
                    component={ProductScreen}
                    options={{ header: (props) => <Header {...props} /> }}
                />
                <Stack.Screen
                    name='Cart'
                    component={CartScreen}
                    options={{
                        headerShown: false,
                        animation: "slide_from_right",
                        animationTypeForReplace: "push",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
