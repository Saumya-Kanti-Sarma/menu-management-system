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
  type: {
    type: [String],//club,events,family restaurant, dhaba
  },
  created: {
    type: String,
    default: new Date(),
  },
  embedding: {
    type: [Number], // Stores the embedding vector
    index: "2dsphere", // Index for vector search
  },
})

export const restaurantData = mongoose.model("restaurant", restaurantSchema);


