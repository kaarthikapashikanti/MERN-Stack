import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import Toppings from "../Toppings/Toppings";
//will have id,image,price,desc of food
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, finalPrice } =
    useContext(StoreContext);
  const [close, setClose] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  function handleClick(id) {
    if (name === "Customize Your Pizza") {
      setClose(true);
    } else {
      addToCart(id);
    }
  }

  useEffect(() => {
    if (name === "Customize Your Pizza") {
      const savedPrice = localStorage.getItem("finalPrice");
      const parse = parseInt(savedPrice);
      if (parse && isClicked) {
        addToCart(id);
      }
    }
  }, [close, isClicked]);
  return (
    <div>
      {close && (
        <Toppings
          display={close}
          setDisplay={setClose}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      )}
      <div className="food-item">
        <div className="food-item-img-container">
          <img
            className="food-item-image"
            src={url + "/images/" + image}
            alt=""
          />

          {!cartItems[id] ? (
            <>
              <img
                className="add"
                onClick={() => handleClick(id)}
                src={assets.add_icon_white}
                alt=""
              />
            </>
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id, name)}
                src={assets.remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => handleClick(id)}
                src={assets.add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-item-description">{description}</p>
          <p className="food-item-price">
            {name !== "Customize Your Pizza" ? "₹" + price : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
