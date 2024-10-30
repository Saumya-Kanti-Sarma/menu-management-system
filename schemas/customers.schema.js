import mongoose from "mongoose";
const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  }
})

export const customerData = mongoose.model("customers", customerSchema)