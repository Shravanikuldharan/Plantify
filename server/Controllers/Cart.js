import Cart from "../Models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { plantId, qty } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existing = cart.items.find(
      (item) => item.plantId.toString() === plantId
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ plantId, qty });
    }

    await cart.save();

    res.json({ success: true, message: "Item added to cart", cart });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

  
      const cart = await Cart.findOne({ userId })
  .populate("items.plantId", "name image price slug saleDiscount stock");

    res.json({ success: true, cart });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const plantId = req.params.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.plantId.toString() !== plantId
    );

    await cart.save();

    res.json({ success: true, message: "Item removed", cart });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};