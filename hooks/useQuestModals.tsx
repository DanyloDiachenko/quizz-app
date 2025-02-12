import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { selectModals, toggleModal } from "@/store/slices/modals";
import { ModalType } from "@/store/slices/modals/modals.type";
import {
    removeQuestion,
    selectActiveQuestion,
    selectOptions,
    selectQuest,
    selectQuestions,
    selectRemovedQuestions,
    setQuestionActiveId,
} from "@/store/slices/quests";
import { useState } from "react";
import { toast } from "react-toastify";

export const useQuestModals = () => {
    const dispatch = useAppDispatch();
    const quest = useAppSelector(selectQuest);
    const questions = useAppSelector(selectQuestions);
    const question = useAppSelector(selectActiveQuestion);
    const options = useAppSelector(selectOptions);
    const modals = useAppSelector(selectModals);
    const removedQuestions = useAppSelector(selectRemovedQuestions);
    const [media, setMedia] = useState<string | null>(null);

    const onQuestionAddClick = (current: ModalType) => {
        dispatch(toggleModal(current));
        dispatch(toggleModal("QuestionCreation"));
    };

    const onQuestionEditClick = (current: ModalType, id: string) => {
        dispatch(toggleModal(current));
        dispatch(toggleModal("QuestionEdit"));
        dispatch(setQuestionActiveId(id));
    };

    const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];

        if (uploadedFile) {
            const fileURL = URL.createObjectURL(uploadedFile);
            setMedia(fileURL);
        }
    };

    const deleteQuestionHandler = (id: string) => {
        dispatch(removeQuestion(id));
        toast.success("Ви успішно видалили це питання!");
    };

    return {
        dispatch,
        modals,
        quest,
        media,
        onQuestionAddClick,
        onQuestionEditClick,
        onImageUpload,
        questions,
        question,
        options,
        removedQuestions,
        deleteQuestionHandler,
    };
};
