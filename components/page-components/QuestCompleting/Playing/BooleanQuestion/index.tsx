"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { BooleanQuestionProps } from "./BooleanQuestion.props";
import { useState, useEffect } from "react";

export const BooleanQuestion = ({
    onAnswerChange,
    initialAnswer = null,
}: BooleanQuestionProps) => {
    const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

    useEffect(() => {
        if (initialAnswer !== null) {
            setSelectedOption(initialAnswer);
        }
    }, [initialAnswer]);

    const onOptionSelect = (value: boolean) => {
        setSelectedOption(value);
        onAnswerChange(value);
    };

    return (
        <div className={`grid grid-cols-2 mt-10`}>
            <div
                className={`text-white text-xl font-semibold flex items-center justify-center aspect-square relative cursor-pointer duration-300 bg-purple ${
                    selectedOption === true ? "bg-opacity-100" : "bg-opacity-40"
                }`}
                onClick={() => onOptionSelect(true)}
            >
                True
                <div className="absolute top-4 right-4">
                    <Checkbox
                        checked={selectedOption === true}
                        onChange={() => onOptionSelect(true)}
                        className="sm:w-10 sm:h-10"
                    />
                </div>
            </div>
            <div
                className={`text-white text-xl font-semibold flex items-center justify-center aspect-square relative cursor-pointer duration-300 bg-yellow ${
                    selectedOption === false
                        ? "bg-opacity-100"
                        : "bg-opacity-40"
                }`}
                onClick={() => onOptionSelect(false)}
            >
                False
                <div className="absolute top-4 right-4">
                    <Checkbox
                        checked={selectedOption === false}
                        onChange={() => onOptionSelect(false)}
                        className="sm:w-10 sm:h-10"
                    />
                </div>
            </div>
        </div>
    );
};
