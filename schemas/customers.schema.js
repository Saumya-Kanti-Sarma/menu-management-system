import mongoose from "mongoose";
const customerSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
    unique: true,
  }
})

export const customerData = mongoose.model("customers", customerSchema)