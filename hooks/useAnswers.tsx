import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import {
    selectActiveQuestion,
    selectOptions,
} from "@/store/slices/quests";

export const useAnswers = () => {
    const dispatch = useAppDispatch();
    const question = useAppSelector(selectActiveQuestion);
    const options = useAppSelector(selectOptions);

    const getOption = (index: number) =>
        options?.find((option) => option.index === index);

    const isChecked = (index: number) =>
        Boolean(getOption(index) && getOption(index)?.isCorrect);

    return { dispatch, getOption, options, isChecked, question };
};
