import mongoose from "mongoose";
const restaurantSchema = mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  ownerName: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: String,
    default: new Date(),
  },
})

export const restaurantData = mongoose.model("restaurant", restaurantSchema);


