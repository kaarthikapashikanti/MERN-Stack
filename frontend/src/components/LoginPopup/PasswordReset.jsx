import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { assets } from "../../assets/assets";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/reset-password",
        { email, token, newPassword }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("error in reseting the password");
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
    marginTop: "20px",
  };
  const imgStyle = {
    position: "absolute",
    right: "190px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    width: "20px",
    height: "20px",
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Reset Password</h2>
        <div
          className="input-container"
          style={{ position: "relative", width: "100%" }}
        >
          <input
            style={{
              width: "70%",
              height: "40px",
              paddingRight: "40px",
              boxSizing: "border-box",
            }}
            type={!show ? "password" : "text"}
            palceholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <img
            style={imgStyle}
            className="pwdshow"
            onClick={() => setShow(!show)}
            src={show ? assets.pwdopen : assets.pwddot}
          />
        </div>
        <button style={myStyles} type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
