import { ModalType } from "@/store/slices/modals/modals.type";

export const isModalOpened = (modal: ModalType, state: ModalType[]) => {
    return state.includes(modal);
};
