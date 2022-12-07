import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "../components/food/foodSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});

export default store;
