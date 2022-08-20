import { configureStore } from "@reduxjs/toolkit";
import { contractSlice } from "./contractSlice";

export const store = configureStore({
  reducer: {
    contract: contractSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
