import React, { useEffect, useState, useContext } from "react";
import {
  base_list,
  sauce_list,
  cheese_list,
  veggies_list,
} from "../../assets/assets";
import "./Toppings.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

function Toppings({ display, setDisplay, isClicked, setIsClicked }) {
  const { handlePrice, addToCart, removeFromCart } = useContext(StoreContext);
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);
  const [price, setPrice] = useState({
    basePrice: 0,
    saucePrice: 0,
    cheesePrice: 0,
    veggiesPrice: [],
  });
  const [finalPrice, SetFinalPrice] = useState(0);

  useEffect(() => {
    const savedPrice = localStorage.getItem("finalPrice");
    if (savedPrice) {
      handlePrice(parseInt(savedPrice));
    }
  }, []);
  // Function to handle selection of base
  function handleBase(e, item_price) {
    if (base !== e.target.value) {
      setBase(e.target.value);
      setPrice((prevState) => ({ ...prevState, basePrice: item_price }));
    }
  }

  // Function to handle selection of sauce
  function handleSauce(e, item_price) {
    if (sauce !== e.target.value) {
      setSauce(e.target.value);
      setPrice((prevState) => ({ ...prevState, saucePrice: item_price }));
    }
  }

  // Function to handle selection of cheese
  function handleCheese(e, item_price) {
    if (cheese !== e.target.value) {
      setCheese(e.target.value);
      setPrice((prevState) => ({ ...prevState, cheesePrice: item_price }));
    }
  }

  // Function to handle selection of veggies
  function handleVeggies(e, item_price) {
    const value = e.target.value;
    if (veggies.includes(value)) {
      // If the option is already selected, remove it
      setVeggies(veggies.filter((option) => option !== value));
      // Also remove its price from the price state
      setPrice((prevState) => ({
        ...prevState,
        veggiesPrice: prevState.veggiesPrice.filter(
          (price) => price !== item_price
        ),
      }));
    } else {
      // Otherwise, add it to the selectedOptions array
      setVeggies([...veggies, value]);
      // Also add its price to the price state
      setPrice((prevState) => ({
        ...prevState,
        veggiesPrice: [...prevState.veggiesPrice, item_price],
      }));
    }
  }

  const ChangeDisplay = () => {
    setIsClicked(true);
  };
  function handleCross() {
    setDisplay(false);
  }

  useEffect(() => {
    const sum =
      price.basePrice +
      price.saucePrice +
      price.cheesePrice +
      price.veggiesPrice.reduce((acc, curr) => acc + curr, 0);

    SetFinalPrice(sum);
    if (isClicked) {
      if (base && sauce && cheese && veggies.length > 0) {
        handlePrice(sum);
        localStorage.setItem("finalPrice", sum);
        setDisplay(false);
      } else {
        toast.error("Select all the toppings options");
      }
      setIsClicked(false);
    }
  }, [price, isClicked, base, sauce, cheese, veggies, finalPrice, setDisplay]);

  return (
    <div className="toppings">
      <h1>Craft Your Crust: Design your dream pizza from scratch!</h1>
      <button className="close" onClick={handleCross}>
        &times;
      </button>
      <hr />
      <div className="toppings-list">
        <h5 className={!finalPrice ? "inactive" : "active"}>
          Total Price is: ₹{finalPrice}
        </h5>
        <p className="toppings-label">Select your pizza base : </p>
        <p className="toppings-small">Select any 1</p>
        <div className="toppings-options">
          {base_list.map((item, index) => {
            return (
              <div key={index} className="toppings-items">
                <img src={item.image} alt="" />
                <label> {item.name}</label>
                <p>₹{item.price}</p>
                <input
                  type="radio"
                  value={item.name}
                  checked={base === item.name}
                  onChange={(e) => handleBase(e, item.price)}
                />
              </div>
            );
          })}
        </div>
        <p className="toppings-label">Select your pizza Sauce : </p>
        <p className="toppings-small">Select any 1</p>
        <div className="toppings-options">
          {sauce_list.map((item, index) => {
            return (
              <div key={index} className="toppings-items">
                <img src={item.image} alt="" />
                <label> {item.name}</label>
                <p>₹{item.price}</p>
                <input
                  type="radio"
                  value={item.name}
                  checked={sauce === item.name}
                  onChange={(e) => handleSauce(e, item.price)}
                />
              </div>
            );
          })}
        </div>
        <p className="toppings-label">Select your pizza Cheese : </p>
        <p className="toppings-small">Select any 1</p>
        <div className="toppings-options">
          {cheese_list.map((item, index) => {
            return (
              <div key={index} className="toppings-items">
                <img src={item.image} alt="" />
                <label> {item.name}</label>
                <p>₹{item.price}</p>
                <input
                  type="radio"
                  value={item.name}
                  checked={cheese === item.name}
                  onChange={(e) => handleCheese(e, item.price)}
                />
              </div>
            );
          })}
        </div>
        <p className="toppings-label">Select your pizza Veggies : </p>
        <p className="toppings-small">Select as your wish</p>
        <div className="toppings-options">
          {veggies_list.map((item, index) => {
            return (
              <div key={index} className="toppings-items">
                <img src={item.image} alt="" />
                <label> {item.name}</label>
                <p>₹{item.price}</p>
                <input
                  type="checkbox"
                  value={item.name}
                  checked={veggies.includes(item.name)}
                  onChange={(e) => handleVeggies(e, item.price)}
                />
              </div>
            );
          })}
        </div>
        <button
          className="order"
          onClick={() => {
            ChangeDisplay();
          }}
          // disabled={!isVeggieSelected}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
export default Toppings;
