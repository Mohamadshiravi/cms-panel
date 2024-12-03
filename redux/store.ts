import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

const store = configureStore({
  reducer: { users: userReducer },
});

store.subscribe(() => {
  console.log("subscribe =>", store.getState());
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos : todoState}
export type AppDispatch = typeof store.dispatch;

export default store;
