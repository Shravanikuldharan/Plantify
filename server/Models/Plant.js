import { Schema, model } from "mongoose";

const plantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

    image: {
      type: String, // ImageKit URL
      required: true,
    },
  },
  { timestamps: true }
);

const Plant = model("Plant", plantSchema);

export default Plant;