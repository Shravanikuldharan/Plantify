import Plant from "../Models/Plant.js";

// ADD PLANT
const addPlant = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields except stock are required",
      });
    }

    const newPlant = new Plant({
      name,
      description,
      price,
      category,
      stock,
      image,  // simple string URL
    });

    await newPlant.save();

    return res.json({
      success: true,
      message: "Plant added successfully",
      plant: newPlant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET ALL PLANTS
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json({ success: true, plants });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET SINGLE PLANT
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found" });
    }

    res.json({ success: true, plant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE PLANT
const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      return res.status(404).json({ success: false, message: "Plant not found" });
    }

    res.json({ success: true, message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE PLANT
const updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, message: "Plant updated", plant: updatedPlant });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addPlant, getPlants, getPlantById, deletePlant, updatePlant };