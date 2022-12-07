import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entities: [],
};

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    foodAdded(state, action) {
      state.push({
        date: action.payload.date,
        desc: action.payload.desc,
        isFood: action.payload.isFood,
        type: action.payload.type,
        value: action.payload.value,
        volume: action.payload.volume,
        image: action.payload.image,
      });
    },
    foodUpdated(state, action) {
      const foodId = action.payload;
      const food = state.entities[foodId];
    },
    foodDeleted(state, action) {
      const foodId = action.payload;
      const food = state.entities[foodId];
      food.active = !food.active
      return state.filter((food) => food.active !== false);
    },
  },
});

export const { foodAdded, foodUpdated, foodDeleted } = foodSlice.actions;

export default foodSlice.reducer;
