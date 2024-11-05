// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import restaurantDataReducer from "./restaurantDataSlice";

const store = configureStore({
  reducer: {
    restaurantData: restaurantDataReducer
  }
});

export default store;
