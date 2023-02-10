// ** Redux Imports
import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

export const wrapper = createWrapper(store);
