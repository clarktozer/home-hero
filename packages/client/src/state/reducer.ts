import { combineReducers } from "@reduxjs/toolkit";
import AppReducer from "./app/slice";

export const RootReducer = combineReducers({
    app: AppReducer,
});

export type RootState = ReturnType<typeof RootReducer>;
