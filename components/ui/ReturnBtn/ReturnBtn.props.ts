import { ModalType } from "@/store/slices/modals/modals.type";

export interface ReturnBtnProps extends React.ComponentProps<"button"> {
    modal?: ModalType;
    isPrev?: boolean;
}
