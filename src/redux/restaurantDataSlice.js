// src/redux/slices/restaurantDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const restaurantDataSlice = createSlice({
  name: "restaurantData",
  initialState: {
    restaurantName: "",
    phoneNumber: "",
    ownerName: "",
    address: "",
    password: "",
    document: ""
  },
  reducers: {
    saveRestaurantData: (state, action) => {
      state.restaurantName = action.payload.restaurantName;
      state.phoneNumber = action.payload.phoneNumber;
      state.ownerName = action.payload.ownerName;
      state.address = action.payload.address;
      state.password = action.payload.password;
      state.document = action.payload.document;
    }
  }
});

export const { saveRestaurantData } = restaurantDataSlice.actions;
export default restaurantDataSlice.reducer;
