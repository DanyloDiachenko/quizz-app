"use client";

import { cn } from "@/helpers/cn";
import { MdCheck } from "react-icons/md";
import { CheckboxProps } from "./Checkbox.props";

export const Checkbox = ({
    checked = false,
    onChange,
    className,
    id,
}: CheckboxProps) => {
    const toggleCheckbox = () => {
        if (onChange) onChange(!checked);
    };

    return (
        <div
            className={cn(
                "w-6 h-6 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all border-purple",
                checked ? "bg-purple border-purple" : "",
                className,
            )}
            onClick={toggleCheckbox}
            id={id}
        >
            {checked && <MdCheck className="size-8" />}
        </div>
    );
};
