import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        plantId: {
          type: Schema.Types.ObjectId,
          ref: "Plant",
          required: true
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        }
      }
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", cartSchema);

export default Cart;