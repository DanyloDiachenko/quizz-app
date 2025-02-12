"use client";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useAnswers } from "@/hooks/useAnswers";
import {
    addOption,
    editOption,
    removeOption,
} from "@/store/slices/quests";

export const Choice = () => {
    const { dispatch, getOption, isChecked } = useAnswers();

    const checkHandler = (isCorrect: boolean, index: number) => {
        const option = getOption(index);

        if (!option) return toast.error("Спочатку напишіть варіант відповіді!");

        dispatch(
            editOption({
                title: option.title,
                isCorrect,
                index,
            }),
        );
    };

    const inputHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const title = e.target.value;

        if (!title) return dispatch(removeOption(index));

        if (!getOption(index))
            return dispatch(addOption({ index, title, isCorrect: false }));

        dispatch(
            editOption({
                title,
                index,
                isCorrect: isChecked(index),
            }),
        );
    };

    return (
        <div className="mt-4">
            <label htmlFor="correctAnswer" className="text-gray">
                Оберіть правильну-(і) відповідь-(і)
            </label>
            <div>
                {[0, 1, 2, 3].map((_, index) => {
                    return (
                        <div className="mt-2" key={index}>
                            <div className="flex justify-between relative">
                                <Input
                                    placeholder={`Впишіть варіант ${
                                        index + 1
                                    }..`}
                                    value={getOption(index)?.title || ""}
                                    onChange={(e) => inputHandler(e, index)}
                                />
                                <Checkbox
                                    checked={isChecked(index)}
                                    onChange={(e) => {
                                        checkHandler(e, index);
                                    }}
                                    className="absolute right-4 top-3"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
