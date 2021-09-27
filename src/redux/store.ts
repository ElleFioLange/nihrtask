import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./formsSlice";

const store = configureStore({
  reducer: formsReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
