import React, { useState } from "react";
import "./home.css";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import Header from "../../components/header/header";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
const home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default home;
