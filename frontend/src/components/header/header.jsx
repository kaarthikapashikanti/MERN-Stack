import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Elevating pizza delivery to a new pulse</h2>
        <p>
          With just a tap, indulge in our mouthwatering selection of pizzas,
          crafted with care and delivered hot to your door. Whether it's a
          classic pepperoni or a gourmet specialty, we've got your cravings
          covered. Join the pulse of pizza lovers and elevate your dining
          experience with Pizza Pulse today<b> Order Now!!</b>
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
