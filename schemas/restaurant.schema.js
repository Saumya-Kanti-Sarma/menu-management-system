import mongoose from "mongoose";
const restaurantSchema = mongoose.Schema({
  restaurantName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
    require: true,
    unique: true,
  },
  ownerName: {
    type: String,
    require: true,
    unique: true,
  },
})

export const restaurantData = mongoose.model("restaurant", restaurantSchema);


