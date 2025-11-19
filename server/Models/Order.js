import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
            {
                plant: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Plant",
                    required: true,
                },
                qty: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },

        address: {
            fullName: { type: String, required: true },
            mobile: { type: String, required: true },
            addressLine: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
        },

        paymentMethod: {
            type: String,
            enum: ["Cash on Delivery", "Online Payment"],
            default: "Cash on Delivery",
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;