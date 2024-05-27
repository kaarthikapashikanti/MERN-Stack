import express from "express";
import {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  requestPasswordReset,
  resetPassword,
} from "../controllers/useController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/register/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/request-password-reset", requestPasswordReset);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
