import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Me_me } from "../../../__types/Me";
import { AppState } from "./types";

const initialState: AppState = {
    viewer: null
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setViewer(state, action: PayloadAction<Me_me | null>) {
            state.viewer = action.payload;
        },
        clearViewer(state) {
            state.viewer = null;
        },
        setViewerWallet(state, action: PayloadAction<boolean>) {
            if (state.viewer) {
                state.viewer.hasWallet = action.payload;
            }
        },
        setConfirmed(state, action: PayloadAction<boolean>) {
            if (state.viewer) {
                state.viewer.confirmed = action.payload;
            }
        }
    }
});

export const { setViewer, clearViewer, setViewerWallet, setConfirmed } =
    appSlice.actions;

export const AppReducer = appSlice.reducer;
