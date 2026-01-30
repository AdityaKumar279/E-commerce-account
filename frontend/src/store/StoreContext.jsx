import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const backendUri = import.meta.env.VITE_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')
  const currency = "₹";
  const delivery_fee = 15;
  const [cartItems, setCartItems] = useState({});
  const navigator= useNavigate(); 

  const FetchList = async () => {
    const response = await axios.get(backendUri + "/api/products/list");

    if (response.data.success) {
      setProducts(response.data.list);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        toast("Item Added to Cart");
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if(token) {
      try {
        await axios.post(`${backendUri}/api/cart/addToCart`, {itemId,size}, {headers:{token}})

      } catch (error) {
        console.log(error);
      }
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

    if(token) {
      try {
        await axios.post(`${backendUri}/api/cart/upDateToCart`, {itemId,size, quantity}, {headers:{token}})
       toast.success("UpDated successfully")
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };



  const getUserCart = async (token) => {
    try {
      const response = await axios.post(`${backendUri}/api/cart/getToCart`,{},  {headers:{token}})
      if(response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

    const  getCartAmount =   () => {
    let amount = 0;
    for (const itemId in cartItems) {
      const itemInfo =  products.find((product) => product._id === itemId);
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          amount += itemInfo.price * cartItems[itemId][size];
        }
      }
    }
    return amount;
  };



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
  };

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
