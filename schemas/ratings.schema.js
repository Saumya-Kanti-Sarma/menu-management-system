import mongoose from "mongoose";
const ratingsSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true,
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
    type: [String],
  },
  dislike: {
    type: [String],
  },
})

export const ratingsData = mongoose.model("ratings", ratingsSchema)