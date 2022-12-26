import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";

/*const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action, currState, prevState) => {
    return prevState.auth.user !== undefined;
  },
  effect: async (action, listenerApi) => {
    console.log("Prev ", listenerApi.getOriginalState());
    console.log("Curr ", listenerApi.getState());
  },
});*/

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware
      /* listenerMiddleware.middleware */
    ),
});

export default store;
