import Wishlist from "../Models/Wishlist.js";

// Add to wishlist
const addWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plantId } = req.body;

    const exists = await Wishlist.findOne({ user: userId, plant: plantId });
    if (exists) {
      return res.status(400).json({ success: false, message: "Already in wishlist" });
    }

    const item = await Wishlist.create({ user: userId, plant: plantId });

    res.status(200).json({
      success: true,
      message: "Added to wishlist",
      item
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove
const removeWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plantId } = req.body;

    await Wishlist.findOneAndDelete({ user: userId, plant: plantId });

    res.json({ success: true, message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all for a user
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({ user: userId }).populate("plant");

    res.status(200).json({
      success: true,
      wishlist
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { addWishlist, removeWishlist, getWishlist };