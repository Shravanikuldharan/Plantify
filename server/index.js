import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAllUsers, postLogin, postSignup } from "./Controllers/user.js";
import { addPlant, deletePlant, getPlantById, getPlants, updatePlant } from "./Controllers/Plant.js";

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
app.get("/users", getAllUsers);
app.post("/plants/add", addPlant);
app.get("/plants", getPlants);
app.get("/plants/:id", getPlantById);
app.delete("/plants/:id", deletePlant);
app.put("/plants/:id", updatePlant);

app.post("/signup", postSignup);
app.post("/login", postLogin);

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