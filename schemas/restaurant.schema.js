import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,
    trim: true,//  Automatically trims whitespace from the start and end
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    trim: true,
  },
  since: {
    type: String,
  },
  address: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  coverPics: {
    type: [String],
  },
  about: {
    type: String,
    trim: true,
  },
  highlights: {
    type: [String],
  },
  created: {
    type: String,
    default: Date(),
  },
});

export const restaurantData = mongoose.model("Restaurant", restaurantSchema);
