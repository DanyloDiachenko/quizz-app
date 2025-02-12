"use client";
import { TbArrowBackUp } from "react-icons/tb";
import { Button } from "../Button";
import { ReturnBtnProps } from "./ReturnBtn.props";
import { cn } from "@/helpers/cn";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { selectPrev, toggleModal } from "@/store/slices/modals";

export const ReturnBtn = ({
    className,
    modal,
    isPrev = false,
}: ReturnBtnProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const prev = useAppSelector(selectPrev);

    const goBack = () => {
        if (!modal) return router.back();
        if (isPrev && prev) dispatch(toggleModal(prev));
        dispatch(toggleModal(modal));
    };

    return (
        <Button
            color="purpleBorder"
            className={cn("flex gap-2", className)}
            onClick={() => goBack()}
        >
            <TbArrowBackUp size={22} />
            <span>Повернутися назад</span>
        </Button>
    );
};
