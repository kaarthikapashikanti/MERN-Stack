import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in memory for simplicity (in a real-world app, store in a database or cache)
const otps = {};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP
const sendOtp = async (req, res) => {
  const { mail } = req.body;
  const exists = await userModel.findOne({ email: mail });
  if (exists) {
    return res.json({ success: false, message: "User already exists" });
  }
  const otp = generateOTP();
  otps[mail] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "OTP code for pizzapulse register",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error in sending the otp to mail" + error);
      return res.json({ success: false, message: "Error sending OTP" });
    } else {
      return res.json({ success: true, message: "OTP sent successfully" });
    }
  });
};

// Verify OTP
const verifyOtp = async (req, res) => {
  const { mail, otp } = req.body;
  if (otps[mail] === otp) {
    delete otps[mail]; // Remove OTP after verification
    return res.json({ success: true, message: "OTP verified successfully" });
  } else {
    return res.json({ success: false, message: "Invalid OTP" });
  }
};

// Log in user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register user
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//reset password functionality

//Helper function to generate a token
const generateResetToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1h" });
};
//request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesnot exists" });
    }
    const resetToken = generateResetToken();
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}&email=${email}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click the following link to reset your password ${resetLink}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset email : ", error);
        return res.json({ success: false, message: "Error sending mail" });
      } else {
        return res.json({
          success: true,
          message: "Reset Password request mail sent",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error processing request" });
  }
};
const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return registerUser.json({
          success: false,
          message: "Invalid or expired token",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "User doesnot exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      return res.json({
        success: true,
        message: "Password Reset Successfully",
      });
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Error in reseting the password",
    });
  }
};
export {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
};
