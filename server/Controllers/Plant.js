import Plant from "../Models/Plant.js";

// ADD PLANT
// const addPlant = async (req, res) => {
//   try {
//     const { name, description, price, category, stock, image } = req.body;

//     if (!name || !description || !price || !category || !image) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields except stock are required",
//       });
//     }

//     const newPlant = new Plant({
//       name,
//       description,
//       price,
//       category,
//       stock,
//       image,  // simple string URL
//     });

//     await newPlant.save();

//     return res.json({
//       success: true,
//       message: "Plant added successfully",
//       plant: newPlant,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };


// add plant
const addPlant = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token",
      });
    }

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
      image,
      addedBy: req.user.id,  
    });

    await newPlant.save();

    return res.json({
      success: true,
      message: "Plant added successfully",
      plant: newPlant,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// get all plants
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json({ success: true, plants });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get single plant
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

// delete plant
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

// update plant
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