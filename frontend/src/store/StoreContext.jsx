import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const backendUri = import.meta.env.VITE_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [token, setToken] = useState('')
  const currency = "₹";
  const delivery_fee = 15;
  const [cartItems, setCartItems] = useState({});
  const navigator= useNavigate(); 


  // 1. A dedicated function to handle the API call
  const fetchProducts = async (pageNumber) => {
    try {
      
      const response = await axios.get(`${backendUri}/api/products/list?page=${pageNumber}&limit=10`);
      
      if (response.data.success) {
        // Append new items to the existing list
        setProducts(prevProducts => [...prevProducts, ...response.data.list]);
        setHasMore(response.data.hasMore);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 2. Initial load: Fetch the first page when the component mounts
  useEffect(() => {
    fetchProducts(page);
  }, [backendUri,page]);

  const FetchList = async () => {
    const response = await axios.get(backendUri + "/api/products/lists");

    if (response.data.success) {
      setProduct(response.data.list);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast("Please select a size");
      return;
    }

    if(token){
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    
      try {
        // axios.defaults.withCredentials = true
       const response =  await axios.post(`${backendUri}/api/cart/addToCart`, {itemId,size}, {headers: {token}})
       if(response.data.success){
        toast.success("Item added to cart")
       }else{
        toast.error(response.data.message)
       }

      } catch (error) {
        toast.error("Failed to add item to cart")
      
    }
  }else{
    toast.error("Please login to add items to cart")
  }
};

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };

  const UpdateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    if (cartData[itemId][size] <= 0) {
      delete cartData[itemId][size];
    }
    setCartItems(cartData);

  if(token){
      try {
        await axios.post(`${backendUri}/api/cart/upDateToCart`, {itemId,size, quantity}, {headers: {token}})
       toast.success("UpDated successfully")
      } catch (error) {
        
        toast.error(error.response.data.message)
      
    }
  }};



  const getUserCart = async (token) => {
    if(token){
    try {
      // axios.defaults.withCredentials = true
      const response = await axios.post(`${backendUri}/api/cart/getToCart`,{}, {headers: {token}})
      if(response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  }
    const  getCartAmount =   () => {
    let amount = 0;
    for (const itemId in cartItems) {
      const itemInfo =  products.filter((item) => item._id === itemId);
      itemInfo.map((item) => {
        for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          amount += item.price * cartItems[itemId][size];
        }
      }

      })
      // for (const size in cartItems[itemId]) {
      //   if (cartItems[itemId][size] > 0) {
      //     amount += itemInfo.price * cartItems[itemId][size];
      //   }
      // }
    }
    return  amount;
  };

  useEffect(() => {
      
      // setToken(localStorage.getItem('token'));
      // getUserCart(localStorage.getItem('token'))

    

  },[token])
  useEffect(() => {
    FetchList();
     if(!token && localStorage.getItem('token')) {
      
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))

    }
   
  }, [])
  const value = {
    backendUri,
    products,
    product,
    setProduct,
    setProducts,
    currency,
    delivery_fee,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    UpdateQuantity,
    getCartAmount,
    navigator,
    token,
    setToken,
    fetchProducts,
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
