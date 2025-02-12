import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsideState } from "./aside.type";

const initialState: AsideState = {
    isOpened: false,
};

const aside = createSlice({
    name: "aside",
    initialState,
    reducers: {
        setIsAsideOpened: (state, action: PayloadAction<boolean>) => {
            state.isOpened = action.payload;
        },
    },
    selectors: {
        selectAside: (state) => state.isOpened,
    },
});

export const { selectAside } = aside.selectors;
export const { setIsAsideOpened } = aside.actions;

export default aside.reducer;
