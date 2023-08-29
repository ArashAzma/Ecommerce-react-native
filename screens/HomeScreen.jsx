import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { fetchAllProducts, fetchCategories } from "../api/productsData";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/productCard";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import Title from "../components/Title";
import tw from "twrnc";
const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAllData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    const getAllData = async () => {
        try {
            const value = await AsyncStorage.getItem("@products");
            if (value) {
                setProducts(JSON.parse(value));
                console.log("\nSTORAGE\n");
            } else {
                const data = await fetchAllProducts();
                if (data) {
                    setProducts(data);
                    await AsyncStorage.setItem(
                        "@products",
                        JSON.stringify(data)
                    );
                    console.log("SAVED");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    const getCategories = async () => {
        try {
            const value = await AsyncStorage.getItem("@categories");
            if (value) {
                setCategories(JSON.parse(value));
            } else {
                const cats = await fetchCategories();
                if (cats) {
                    setCategories(["All", ...cats]);
                    await AsyncStorage.setItem(
                        "@categories",
                        JSON.stringify(["All", ...cats])
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleCategoryPress = (name) => {
        setActiveCategory(name === activeCategory ? null : name);
        if (name === "All") {
            setFilteredProducts([]);
        }
        const data = products;
        const newData = products.filter((data) => data.category === name);
        setFilteredProducts(newData);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.length === 0) {
            setSearch("");
            setFilteredProducts([]);
        } else {
            const searchRegex = new RegExp(search, "i");
            const temp = products.filter((item) =>
                searchRegex.test(item.title)
            );
            console.log(temp);
            setFilteredProducts(temp);
        }
    };
    const handleNavigation = (id) => {
        navigation.navigate("Product", { id });
    };
    useEffect(() => {
        getCategories();
        getAllData();
        setActiveCategory("All");
    }, []);

    const DATA = filteredProducts.length > 0 ? filteredProducts : products;
    return (
        <View style={tw`flex-1 bg-[#F8F6F4] items-center justify-center`}>
            <SafeAreaView
                style={tw`flex-1 w-full items-center justify-center px-6`}
            >
                <View style={tw` w-full my-1`}>
                    <TextInput
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        onSubmitEditing={handleSearch}
                        style={tw`bg-white w-full p-2 text-lg shadow-sm rounded-lg `}
                        placeholder='Search products'
                    />
                    {search.length > 0 && (
                        <TouchableOpacity
                            style={tw`absolute top-3 right-2`}
                            onPress={() => setSearch("")}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={tw`mb-6 h-full p-2`}
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((cat) => (
                        <Pressable
                            key={cat}
                            onPress={() => handleCategoryPress(cat)}
                            style={[
                                tw`mr-2 p-2 rounded-lg`,
                                {
                                    backgroundColor:
                                        activeCategory === cat
                                            ? "#E3F4F4"
                                            : "white",
                                    shadowColor:
                                        activeCategory === cat
                                            ? "#000000"
                                            : "#00000029",
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    tw`text-lg font-bold`,
                                    {
                                        color:
                                            activeCategory === cat
                                                ? "blue"
                                                : "black",
                                    },
                                ]}
                            >
                                {cat}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <Title title='New Arrivals' />
                <FlatList
                    data={DATA}
                    numColumns={2}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ItemSeparatorComponent={() => <View style={tw`h-8`}></View>}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`items-center`}
                    renderItem={(item) => {
                        return (
                            <Pressable
                                onPress={() => handleNavigation(item.item.id)}
                                style={tw`ml-6`}
                            >
                                <ProductCard item={item.item} />
                            </Pressable>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        </View>
    );
};

export default HomeScreen;
