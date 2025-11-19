import Order from "../Models/Order.js";
import Cart from "../Models/Cart.js";

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, totalAmount, paymentMethod, address } = req.body;

    // If frontend sends items (Buy Now)
    if (items && items.length > 0) {
      const formattedItems = items.map((item) => ({
        plant: item.plantId,
        qty: item.qty,
        price: item.price,
      }));

      const order = await Order.create({
        user: userId,
        items: formattedItems,
        totalAmount,
        paymentMethod,
        address: {
          fullName: address.fullName,
          mobile: address.mobile,
          addressLine: address.addressLine,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
      });

      return res.json({ success: true, message: "Order placed!", order });
    }

    // Otherwise place order from cart
    const cart = await Cart.findOne({ userId }).populate("items.plantId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const cartItems = cart.items.map((item) => ({
      plant: item.plantId._id,
      qty: item.qty,
      price: item.plantId.price,
    }));

    const cartTotal = cartItems.reduce((sum, i) => sum + i.qty * i.price, 0);

    const order = await Order.create({
      user: userId,
      items: cartItems,
      totalAmount: cartTotal,
      paymentMethod,
      address: {
        fullName: address.fullName,
        mobile: address.mobile,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed!", order });
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: "Cancelled" } })
      .populate("user", "name mobile email")
      .populate("items.plant", "name image price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("items.plant", "name image price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("GET USER ORDERS ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//admin side
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const allowed = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("items.plant", "name image price")
      .populate("user", "name email mobile");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.json({
      success: true,
      message: "Status updated successfully",
      order,
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message: "Only pending orders can be cancelled",
      });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (err) {
    console.error("CANCEL ORDER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  cancelOrder
};
