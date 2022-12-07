import foodReducer from "../components/food/foodSlice";

export default function rootReducer(state = {}, action) {
  return {
    food: foodReducer(state.food, action),
  };
}
