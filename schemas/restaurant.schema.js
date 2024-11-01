import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,
    trim: true,//  Automatically trims whitespace from the start and end
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  type: {
    type: [String], // Array of restaurant types
    enum: ["club", "events", "family", "dhaba", "bar", "cafe"], // Valid types
  },
  created: {
    type: String,
    default: Date(),
  },
  embedding: {
    type: [Number],
    index: "2dsphere",
  },
});

export const restaurantData = mongoose.model("Restaurant", restaurantSchema);
