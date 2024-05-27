import { createContext, useState, useEffect } from "react";
export const StoreContext = createContext(null);
import axios from "axios";
import cart from "../pages/cart/cart";

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [finalPrice, SetFinalPrice] = useState(0);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  // Rest of the code...
  const d = new Date();
  const handlePrice = (sum) => {
    SetFinalPrice(sum);
  };
  const removeFromCart = async (itemId, name) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (name === "Customize Your Pizza") {
      SetFinalPrice(0);
      localStorage.removeItem("finalPrice");
    }
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      if (itemId === "6652c12769f4fe71feb4ed64") {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] }));
      } else {
        setCartItems((prev) => ({
          ...prev,
          [itemId]: prev[itemId] + 1,
        }));
      }
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
    const savedPrice = localStorage.getItem("finalPrice");
    if (!savedPrice) {
      localStorage.setItem("finalPrice", finalPrice);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (!itemInfo) {
          continue; // Skip this iteration if itemInfo is undefined
        }
        if (itemInfo.name === "Customize Your Pizza") {
          totalAmount += finalPrice;
        } else {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    removeFromCart,
    handlePrice,
    finalPrice,
    SetFinalPrice,
    addToCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
