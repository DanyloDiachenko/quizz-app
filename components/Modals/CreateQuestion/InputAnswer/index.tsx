"use client";
import { Input } from "@/components/ui/Input";
import { useAnswers } from "@/hooks/useAnswers";
import {
    addOption,
    editOption,
    removeOption,
} from "@/store/slices/quests";

export const InputAnswer = () => {
    const { dispatch, getOption } = useAnswers();

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;

        if (!title) return dispatch(removeOption(0));

        if (!getOption(0))
            return dispatch(
                addOption({
                    index: 0,
                    title,
                    isCorrect: true,
                }),
            );

        dispatch(
            editOption({
                index: 0,
                title,
                isCorrect: true,
            }),
        );
    };

    return (
        <div className="mt-4">
            <label htmlFor="correctAnswer" className="text-gray">
                Впишіть правильну відповідь
            </label>
            <Input
                id="correctAnswer"
                className="mt-2"
                placeholder="Правильна відповідь..."
                value={getOption(0)?.title || ""}
                onChange={inputHandler}
            />
        </div>
    );
};
