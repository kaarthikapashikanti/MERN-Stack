import React, { useState, useEffect } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [image, setImage] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategory((prevSelectedCategory) => {
      if (checked) {
        return [...prevSelectedCategory, value];
      } else {
        return prevSelectedCategory.filter((category) => category !== value);
      }
    });
  };

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: [],
  });

  useEffect(() => {
    // Sync the selectedCategory with data.category whenever it changes
    setData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  }, [selectedCategory]);

  const OnChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));

    selectedCategory.forEach((category) => {
      formData.append("category", category);
    });

    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: [],
        });
        setSelectedCategory([]);
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={OnChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here.."
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={OnChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write Content here.."
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category">
            <p>Product Category</p>
            <div className="checkbox-container">
              {[
                "Pure-Veg",
                "Non-Veg",
                "Panner",
                "Chicken",
                "Tikka",
                "Tandoori",
                "Italian",
                "Greek",
                "StuffedCrust",
              ].map((category) => (
                <div className="label-checkbox" key={category}>
                  <label htmlFor={category}>{category}</label>
                  <input
                    id={category}
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={OnChangeHandler}
              value={data.price}
              type="number"
              placeholder="Price"
              name="price"
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
