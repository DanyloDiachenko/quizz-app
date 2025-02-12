"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { ChoiceQuestionProps } from "./ChoiceQuestion.props";
import { useEffect, useState } from "react";
import { cn } from "@/helpers/cn";

const answersColors = [
    "bg-[#452168]",
    "bg-[#215e3f]",
    "bg-[#8e612d]",
    "bg-[#452168]",
];

export const ChoiceQuestion = ({
    question,
    onAnswerChange,
    initialAnswer = [],
}: ChoiceQuestionProps) => {
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    useEffect(() => {
        if (!question.options) return;
        if (initialAnswer.length > 0) {
            const restoredIndexes = question.options
                .map((option, index) =>
                    initialAnswer.includes(option) ? index : -1,
                )
                .filter((index) => index !== -1);

            setSelectedOptions(restoredIndexes);
        }
    }, [initialAnswer, question.options]);

    if (!question.options) return;

    const onOptionSelect = (index: number) => {
        let newSelectedOptions;

        if (selectedOptions.includes(index)) {
            newSelectedOptions = selectedOptions.filter((i) => i !== index);
        } else {
            newSelectedOptions = [...selectedOptions, index];
        }

        setSelectedOptions(newSelectedOptions);

        if (question.options) {
            //@ts-ignore
            onAnswerChange(newSelectedOptions.map((i) => question.options[i]));
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 px-4">
            {question.options.map((option, index) => (
                <div
                    key={index}
                    className={cn(
                        "text-white text-base md:text-xl font-semibold flex items-center justify-center aspect-square relative cursor-pointer rounded-lg transition-all p-2 overflow-auto",
                        answersColors[index],
                        selectedOptions.includes(index)
                            ? "opacity-100"
                            : "opacity-50",
                    )}
                    onClick={() => onOptionSelect(index)}
                >
                    {option.title}
                    <Checkbox
                        checked={selectedOptions.includes(index)}
                        onChange={() => onOptionSelect(index)}
                        className="absolute top-4 right-4 w-6 h-6"
                    />
                </div>
            ))}
        </div>
    );
};
