import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, Viewer } from "./types";

const initialState: AppState = {
    viewer: null
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setViewer(state, action: PayloadAction<Viewer | null>) {
            state.viewer = action.payload;
        }
    }
});

export const { setViewer } = appSlice.actions;

export const AppReducer = appSlice.reducer;
