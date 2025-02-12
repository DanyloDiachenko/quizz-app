import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState, ModalType } from "./modals.type";

const initialState: ModalState = {
    active: [],
};

const modals = createSlice({
    name: "modals",
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<ModalType>) => {
            const isOpened = state.active.includes(action.payload);

            if (!isOpened) {
                return {
                    ...state,
                    active: [...state.active, action.payload],
                };
            }

            const active = state.active.filter((m) => m !== action.payload);
            return { ...state, active, prev: action.payload };
        },

        setModals: (state, action: PayloadAction<ModalType[]>) => {
            return {
                ...state,
                active: action.payload,
            };
        },
    },
    selectors: {
        selectModals: (state) => state.active,
        selectPrev: (state) => state.prev,
        selectDeleteConfirmationTitle: (state) => state.deleteCofirmationTitle,
    },
});

export const { selectModals, selectPrev, selectDeleteConfirmationTitle } =
    modals.selectors;
export const { toggleModal, setModals } = modals.actions;

export default modals.reducer;
