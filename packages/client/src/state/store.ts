import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { RootReducer } from "./reducer";

export const Store = configureStore({
    reducer: RootReducer,
});

export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
