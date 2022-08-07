import { configureStore, combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

const reducer = combineReducers({
  root: rootReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
