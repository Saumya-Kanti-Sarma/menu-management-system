import mongoose from "mongoose";

const ratingsSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // referance to Customer collections of DB,it will help us to populate the customerID with specific Customer to which the id belongs
    required: true,
  },
  dishID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu", // referance to Menu collections of DB, it will help us to populate the dishID with specific dishes to which the id belongs
    required: true,
  },
  review: {
    type: String,
    trim: true, // will remove blank space from the start and end.
  },
  customerName: {
    type: String,
    trim: true, // will remove blank space from the start and end.
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  gender: {
    type: Boolean,
    default: true
  }
});
ratingsSchema.index(
  {
    customerID: 1,
    dishID: 1
  },
  {
    unique: true
  }
);

export const ratingsData = mongoose.model("Ratings", ratingsSchema);
