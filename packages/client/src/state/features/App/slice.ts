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
        },
        clearViewer(state) {
            state.viewer = null;
        },
        setViewerWallet(state, action: PayloadAction<boolean>) {
            if (state.viewer) {
                state.viewer.hasWallet = action.payload;
            }
        }
    }
});

export const { setViewer, clearViewer, setViewerWallet } = appSlice.actions;

export const AppReducer = appSlice.reducer;
