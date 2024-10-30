import mongoose from "mongoose";
const menuSchema = mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  menuOf: {
    type: String,
    required: true,
  },
})

menuSchema.index({ menuOf: 1, dishName: 1 }, { unique: true });

export const menuData = mongoose.model("menu", menuSchema)