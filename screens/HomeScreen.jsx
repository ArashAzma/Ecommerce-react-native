import {
    View,
    Text,
    FlatList,
    RefreshControl,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Dimensions,
} from "react-native";
import { fetchAllProducts, fetchCategories } from "../api/productsData";
import React, { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/productCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import NetInfo from "@react-native-community/netinfo";
import Title from "../components/Title";
import tw from "twrnc";
const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [online, setOnline] = useState(true);
    const [loading, setLoading] = useState(true);
    const { width, height } = Dimensions.get("window");
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
        setLoading(true);
        if (search.length === 0) {
            setSearch("");
            setFilteredProducts([]);
        } else {
            const searchRegex = new RegExp(search, "i");
            const temp = products.filter((item) =>
                searchRegex.test(item.title)
            );
            setFilteredProducts(temp);
        }
        setLoading(false);
    };
    const handleNavigation = (id) => {
        navigation.navigate("Product", { id });
    };
    useEffect(() => {
        NetInfo.fetch().then((state) => {
            setOnline(state.isInternetReachable);
        });
        setLoading(true);
        getCategories();
        getAllData();
        setActiveCategory("All");
        setLoading(false);
    }, []);

    const DATA = filteredProducts.length > 0 ? filteredProducts : products;
    return (
        <View style={tw`flex-1 bg-[#F8F6F4] items-center justify-center`}>
            {!online && (
                <View
                    style={tw`w-full items-center justify-center bg-red-700 py-2`}
                >
                    <Text style={tw`text-white text-lg`}>Offline</Text>
                </View>
            )}
            {loading ? (
                <ActivityIndicator size='large' />
            ) : (
                <SafeAreaView
                    style={tw`flex-1 w-full items-center justify-center `}
                >
                    {/* //search */}
                    <View style={tw` w-full my-1 px-6 `}>
                        <TextInput
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                            onSubmitEditing={handleSearch}
                            style={tw`bg-white w-full p-2 text-lg shadow-sm rounded-lg `}
                            placeholder='Search products'
                        />
                        {search.length > 0 && (
                            <TouchableOpacity
                                style={tw`absolute top-4 right-9`}
                                onPress={() => setSearch("")}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </TouchableOpacity>
                        )}
                    </View>
                    {/* // banner */}
                    <View
                        style={tw`w-full bg-white my-12 items-end flex-row h-22 `}
                    >
                        <View style={tw`w-[40%] h-full justify-center pl-8`}>
                            <Text style={tw`text-3xl font-black`}>Arash %</Text>
                            <Text style={tw` font-semibold opacity-50`}>
                                everything you ever wanted
                            </Text>
                        </View>
                        <Image
                            source={require("../assets/Hero.png")}
                            style={{
                                ...tw`absolute -bottom-13 -right-3`,
                                height: width / 2.1,
                                width: width / 1.7,
                            }}
                            resizeMode='contain'
                        />
                    </View>
                    {/* //categories */}

                    <ScrollView
                        horizontal
                        contentContainerStyle={tw`mb-12  h-26 px-4 ${
                            Platform.OS === "ios" ? " pb-0 mb-0 " : ""
                        }`}
                        showsHorizontalScrollIndicator={false}
                    >
                        {categories.map((cat) => (
                            <Pressable
                                key={cat}
                                onPress={() => handleCategoryPress(cat)}
                                style={[
                                    tw`mr-2 px-2 rounded-lg items-center justify-center h-14`,
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
                                        tw`text-lg font-bold text-center`,
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
                    {/* // products */}
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
                        ItemSeparatorComponent={() => (
                            <View style={tw`h-4 `}></View>
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={tw`items-center justify-between`}
                        renderItem={(item) => {
                            return (
                                <Pressable
                                    onPress={() =>
                                        handleNavigation(item.item.id)
                                    }
                                    style={tw`mx-4`}
                                >
                                    <ProductCard item={item.item} />
                                </Pressable>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            )}
        </View>
    );
};

export default HomeScreen;
