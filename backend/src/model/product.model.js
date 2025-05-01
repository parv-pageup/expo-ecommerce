import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
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
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Fashion",
      "Beauty",
      "Home",
      "Sports",
      "Toys",
      "Books",
      "food",
    ],
    required: true,
  },
  stock: {
    type: Number,
    default: 100,
  },
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
