import mongoose from "mongoose";
const menuSchema = mongoose.Schema({
  restaurantID: {
    type: String,
    require: true,
  },
  dishName: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  menuOf: {
    type: String,
    require: true,
  },
})

export const menuData = mongoose.model("menu", menuSchema)