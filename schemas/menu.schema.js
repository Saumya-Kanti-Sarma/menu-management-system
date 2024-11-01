import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
    trim: true, // automatically reoves white space from start and end
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId, // Referencing restaurant ID for efficient lookups
    ref: "Restaurant",  // referance to Restaurant collection of DB, it will help us to populate the restaurantId with specific restaurants to which the id belongs
    required: true,
  },
});

menuSchema.index(
  {
    restaurantId: 1,
    dishName: 1
  },
  {
    unique: true
  }
);

export const menuData = mongoose.model("Menu", menuSchema);
