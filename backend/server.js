import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

//app config
const app = express();
const PORT = 4000;

//middleware
app.use(express.json()); //whenever we get the request from the frontend to backend that will be parsed to json
app.use(cors()); //we can access the backend from any frontend

//db connection
connectDB();

//api end points
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
