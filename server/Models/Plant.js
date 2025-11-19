import { Schema, model } from "mongoose";

const plantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Indoor",
        "Outdoor",
        "Flowering",
        "Succulent",
        "Air Purifying",
        "Herbal",
        "Fruit",
        "Bonsai",
        "Seasonal",
        "Climber",
      ],
    },

    stock: {
      type: Number,
      default: 10,
    },
    saleDiscount: {
      type: Number,
      default: 0,
    },

    saleBadge: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Plant = model("Plant", plantSchema);

export default Plant;