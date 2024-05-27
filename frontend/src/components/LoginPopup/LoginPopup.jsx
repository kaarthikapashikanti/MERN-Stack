import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [currentState, setcurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, Setotp] = useState("");
  const [create, SetCreate] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [pwdOpen, setPwdOpen] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const mail = data.email;
      const response = await axios.post(
        "http://localhost:4000/api/user/register/send-otp",
        { mail }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const mail = data.email;
      const response = await axios.post(
        "http://localhost:4000/api/user/verify-otp",
        { mail, otp }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setOtpSent(false);
        SetCreate(true);
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success("Logined Successfully");
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your Email"
            required
          />
          <div className="input-container">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={pwdOpen ? "text" : "password"}
              placeholder="Password"
              required
            />
            <img
              className="pwdshow"
              onClick={() => setPwdOpen(!pwdOpen)}
              src={pwdOpen ? assets.pwdopen : assets.pwddot}
            />
          </div>
          {currentState === "Login" ? (
            <button
              type="button"
              className="forgot-password"
              onClick={() => {
                navigate("password-reset-request");
                setShowLogin(false);
              }}
            >
              Forgot Password
            </button>
          ) : (
            <>
              {!otpSent && !create && (
                <button onClick={sendOtp}>Send OTP</button>
              )}
              {otpSent && (
                <>
                  <input
                    name="otp"
                    onChange={(e) => Setotp(e.target.value)}
                    value={otp}
                    type="text"
                    placeholder="Your OTP"
                    required
                  />
                  <button onClick={verifyOtp}>Verify OTP</button>
                </>
              )}
              {/* {toast.success(message)} */}
            </>
          )}
        </div>
        {currentState === "Sign Up" ? (
          <button type="submit" className={!create ? "inactive" : ""}>
            create Account
          </button>
        ) : (
          ""
        )}
        {currentState === "Login" ? <button type="submit">Login</button> : ""}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms of use & privacy policy </p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setcurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
