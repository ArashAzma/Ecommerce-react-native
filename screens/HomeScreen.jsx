import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProduct,
} from "../api/productsData";
import React, { useEffect, useState, useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { cartContext } from "../context/cartProvider";
import ProductCard from "../components/productCard";
const HomeScreen = () => {
  const { addToCart, removeFromCart } = useContext(cartContext);
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
      } else {
        const data = await fetchAllProducts();
        if (data) {
          setProducts(data);
          await AsyncStorage.setItem("@products", JSON.stringify(data));
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
          await AsyncStorage("@categories", JSON.stringify(cats));
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
      const temp = products.filter((item) => searchRegex.test(item.title));
      console.log(temp);
      setFilteredProducts(temp);
    }
  };
  const handleNavigation = (id) => {
    navigation.navigate("Product", { id });
  };
  const handleAddCart = (item) => {};
  useEffect(() => {
    getCategories();
    getAllData();
    setActiveCategory("All");
  }, []);

  const DATA = filteredProducts.length > 0 ? filteredProducts : products;
  return (
    <View style={tw`flex-1 bg-[#F8F6F4] items-center justify-center`}>
      <SafeAreaView
        style={tw`flex-1 w-full items-center justify-center mt-8 px-6`}
      >
        <View style={tw`flex-row w-full justify-between items-center`}>
          <Text>M</Text>
          <Text style={tw` text-2xl font-bold`}>NOORI</Text>
          <Text>C</Text>
        </View>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          onSubmitEditing={handleSearch}
          style={tw`bg-white w-full p-2 text-lg shadow-sm rounded-lg my-6`}
          placeholder="Search products"
        />
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
                  backgroundColor: activeCategory === cat ? "#E2E8F0" : "white",
                  shadowColor: activeCategory === cat ? "#000000" : "#00000029",
                },
              ]}
            >
              <Text
                style={[
                  tw`text-lg font-bold`,
                  {
                    color: activeCategory === cat ? "blue" : "black",
                  },
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={tw`w-full justify-start pl-2 my-6 font-bold text-2xl`}>
          New Arrivals
        </Text>
        <FlatList
          data={DATA}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                {/* <TouchableOpacity onPress={() => addToCart(item.item)}>
                  <Text style={tw`text-blue-900`}>Add to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(item.item)}>
                  <Text style={tw`text-red-900`}>remove to cart</Text>
                </TouchableOpacity> */}
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
