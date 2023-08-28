import axios from "axios";

const BaseUrl = "https://fakestoreapi.com";
export const fetchAllProducts = async () => {
  try {
    // const res = await axios.get(`${BaseUrl}/products`);
    // console.log(res.data[0]);
    // return res.data;
    const res = await fetch("https://fakestoreapi.com/products ");
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchProduct = async (id) => {
  try {
    const res = await axios.get(`${BaseUrl}/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${BaseUrl}/products/categories`);
    // const res = await axios.get(`https://fakestoreapi.com/products/categories`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
