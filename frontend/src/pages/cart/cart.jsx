import React, { useContext, useEffect } from "react";
import "./cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    food_list,
    removeFromCart,
    finalPrice,
    handlePrice,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);
  useEffect(() => {
    const savedPrice = localStorage.getItem("finalPrice");
    if (savedPrice) {
      handlePrice(parseInt(savedPrice));
    }
  }, [finalPrice]);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            if (item.name == "Customize Your Pizza") {
              const savedPrice = localStorage.getItem("finalPrice");
              const parsedPrice = parseInt(savedPrice);
              if (parsedPrice > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img src={url + "/images/" + item.image} alt="" />
                      <p>{item.name}</p>
                      <p>₹{parsedPrice}</p>
                      <p>{1}</p>
                      <p>₹{parsedPrice}</p>
                      <p
                        onClick={() => removeFromCart(item._id, item.name)}
                        className="cross"
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              } else {
                return null;
              }
            } else {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id, item.name)}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="card-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? "" : 40}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <p>GST</p>
              <p>{getTotalCartAmount() === 0 ? "" : 10}</p>
            </div>
            <hr />
            <div className="card-total-details">
              <b>Total : </b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 40 + 10}
              </b>
            </div>
            <button onClick={() => navigate(`/order`)}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter your promocode</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;
