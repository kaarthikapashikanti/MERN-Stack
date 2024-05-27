import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  // Filter food items based on the selected category
  const filteredFoodList =
    category === "All"
      ? food_list
      : food_list.filter((item) => item.category.includes(category));

  return (
    <div className="food-display" id="food-display">
      <h2>Pizza Pulse: Tune in to the tastiest slices near you!</h2>
      <div className="food-display-list">
        {filteredFoodList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
