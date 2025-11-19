import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAllUsers, postLogin, postSignup, updateUser } from "./Controllers/user.js";
import { addPlant, deletePlant, getPlantById, getPlantBySlug, getPlants, updatePlant } from "./Controllers/Plant.js";
import jwtCheck from "./Middleware/jwtCheck.js";
import adminCheck from "./Middleware/adminCheck.js";

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

app.get("/plants/slug/:slug", getPlantBySlug);
app.get("/plants", getPlants);
app.get("/plants/:id", getPlantById);

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