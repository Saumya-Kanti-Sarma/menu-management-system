import mongoose from "mongoose";
const ratingsSchema = mongoose.Schema({
  customerName: {
    type: String,
    require: true,
  },
  dishID: {
    type: String,
    require: true,
  },
  review: {
    type: String,
  },
  stars: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
})

export const ratingsData = mongoose.model("ratings", ratingsSchema)