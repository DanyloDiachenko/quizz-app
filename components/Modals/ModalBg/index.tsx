"use client";

import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { toggleModal } from "@/store/slices/modals";
import { ModalBgProps } from "./ModalBg.props";

export const ModalBg = ({ modal }: ModalBgProps) => {
    const dispatch = useAppDispatch();

    return (
        <div
            className="h-full w-full fixed bg-black bg-opacity-70"
            onClick={() => dispatch(toggleModal(modal))}
        />
    );
};
