import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/counters/authSlice";

export const store = configureStore({
  reducer: {
    counter: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
