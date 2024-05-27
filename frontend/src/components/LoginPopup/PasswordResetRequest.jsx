import React, { useState, usestate } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/request-password-reset",
        { email }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in sending password reset request");
    }
  };
  const myStyles = {
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "tomato",
    fontSize: "15px",
    cursor: "pointer",
    marginLeft: "20px",
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Request password Reset</h2>
        <input
          style={{ width: "520px", height: "40px", marginBottom: "20px" }}
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button style={myStyles} type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
