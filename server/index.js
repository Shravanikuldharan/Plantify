import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAllUsers, postLogin, postSignup, updateUser } from "./Controllers/user.js";
import { addPlant, deletePlant, getPlantById, getPlantBySlug, getPlants, updatePlant } from "./Controllers/Plant.js";
import { addToCart, getCart, removeFromCart } from "./Controllers/Cart.js";
import jwtCheck from "./Middleware/jwtCheck.js";
import adminCheck from "./Middleware/adminCheck.js";
import { addWishlist, getWishlist, removeWishlist } from "./Controllers/Wishlist.js";
import { cancelOrder, getAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "./Controllers/Order.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

//Admin
app.get("/users",jwtCheck, adminCheck, getAllUsers);
app.post("/plants/add",jwtCheck, adminCheck, addPlant);
app.delete("/plants/:id",jwtCheck, adminCheck, deletePlant);
app.put("/plants/:id",jwtCheck, adminCheck, updatePlant);
app.get("/admin/orders", jwtCheck, adminCheck, getAllOrders);
app.put("/admin/order/update/:id", jwtCheck, adminCheck, updateOrderStatus);

app.get("/plants/slug/:slug", getPlantBySlug);
app.get("/plants", getPlants);
app.get("/plants/:id", getPlantById);

app.post("/cart/add", jwtCheck, addToCart);
app.get("/cart", jwtCheck, getCart);
app.delete("/cart/remove/:id", jwtCheck, removeFromCart);

app.post("/order/place", jwtCheck, placeOrder);
app.get("/order/my-orders", jwtCheck, getUserOrders);
app.put("/order/cancel/:id", jwtCheck, cancelOrder);

app.post("/wishlist/add", jwtCheck, addWishlist);
app.post("/wishlist/remove", jwtCheck, removeWishlist);
app.get("/wishlist", jwtCheck, getWishlist);

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.put("/users/:id", jwtCheck, updateUser);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running...",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});