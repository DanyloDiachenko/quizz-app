"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { useAnswers } from "@/hooks/useAnswers";
import { editOption, setOptions } from "@/store/slices/quests";
import { useState } from "react";
import { toast } from "react-toastify";

export const BooleanAnswer = () => {
    const { dispatch, getOption } = useAnswers();
    const [value, setValue] = useState<boolean>(false);
    const [value1, setValue1] = useState<boolean>(false);

    const checkHandler = (isCorrect: boolean, index: number) => {
        const title = getOption(index)?.title;
        index ? setValue1(isCorrect) : setValue(isCorrect);

        const booleanOptions = [
            {
                index: 0,
                title: "Хибність",
                isCorrect: index === 0 && isCorrect,
            },
            {
                index: 1,
                title: "Істина",
                isCorrect: index === 1 && isCorrect,
            },
        ];

        if (!title) return dispatch(setOptions(booleanOptions));

        if (getOption(index ? 0 : 1)!.isCorrect && isCorrect) {
            return toast.error("Оберіть одну правильну відповідь!");
        } else if (!getOption(index ? 0 : 1)!.isCorrect && !isCorrect) {
            return dispatch(setOptions(null));
        }

        dispatch(
            editOption({
                title,
                isCorrect,
                index,
            }),
        );
    };

    return (
        <div className="mt-4">
            <label htmlFor="correctAnswer" className="text-gray">
                Оберіть правильну відповідь
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                    color="purpleBorder"
                    className="flex justify-between bg-blackOpacity p-4"
                    type="button"
                    onClick={() => checkHandler(!value1, 1)}
                >
                    <span>Істина</span>
                    <Checkbox checked={getOption(1)?.isCorrect} />
                </button>
                <button
                    color="purpleBorder"
                    className="flex justify-between bg-blackOpacity p-4"
                    type="button"
                    onClick={() => checkHandler(!value, 0)}
                >
                    <span>Хибність</span>
                    <Checkbox checked={getOption(0)?.isCorrect} />
                </button>
            </div>
        </div>
    );
};
