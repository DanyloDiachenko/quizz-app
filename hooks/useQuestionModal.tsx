import { SelectOption } from "@/types/selectOption.interface";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { toast } from "react-toastify";
import { ModalType } from "@/store/slices/modals/modals.type";
import { BooleanAnswer } from "@/components/Modals/CreateQuestion/BooleanAnswer";
import { InputAnswer } from "@/components/Modals/CreateQuestion/InputAnswer";
import { Choice } from "@/components/Modals/CreateQuestion/ChoiceAnswer";
import { selectModals, selectPrev, toggleModal } from "@/store/slices/modals";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import {
    removeQuestionImage,
    selectActiveQuestion,
    selectOptions,
    setOptions,
} from "@/store/slices/quests";

const questionTypes: SelectOption[] = [
    {
        title: "Відкритого типу",
        value: "2",
    },
    {
        title: "Вибір з варіантами",
        value: "1",
    },
    {
        title: "Правда/Брехня",
        value: "0",
    },
];

export const useQuestionModal = () => {
    const dispatch = useAppDispatch();
    const modals = useAppSelector(selectModals);
    const question = useAppSelector(selectActiveQuestion);
    const options = useAppSelector(selectOptions);
    const prevModal = useAppSelector(selectPrev);

    const [media, setMedia] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [questionType, setQuestionType] = useState<SelectOption | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const removeImageHandler = (questionId?: string) => {
        setMedia(null);
        if (questionId) dispatch(removeQuestionImage(questionId));
    };

    const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];

        if (uploadedFile) {
            const fileURL = URL.createObjectURL(uploadedFile);
            setMedia(fileURL);
        }
    };

    useEffect(() => {
        if (question) {
            const options = question.choiceOptions.map((o, index) => {
                return {
                    ...o,
                    index,
                };
            });
            dispatch(setOptions(options));
        }

        if (question?.type !== Number(questionType?.value))
            dispatch(setOptions(null));
    }, [question, questionType]);

    const renderQuestionTitle = () => {
        switch (question?.type) {
            case 2:
                return "Відкритого типу";
            case 1:
                return "Вибір з варіантами";
            case 0:
                return "Правда/Брехня";
            default:
                return "";
        }
    };

    const renderGetAnswer = () => {
        switch (questionType?.value) {
            case "2":
                return <InputAnswer />;
            case "1":
                return <Choice />;
            case "0":
                return <BooleanAnswer />;
            default:
                return <></>;
        }
    };

    const resetOptions = (modal: ModalType, msg: string) => {
        setText("");
        setMedia(null);
        dispatch(setOptions(null));
        setQuestionType(null);
        dispatch(toggleModal(modal));
        if (prevModal) dispatch(toggleModal(prevModal));
        toast.success(msg);
    };

    return {
        questionTypes,
        questionType,
        renderGetAnswer,
        onFileUpload,
        setQuestionType,
        renderQuestionTitle,
        dispatch,
        modals,
        question,
        prevModal,
        options,
        fileInputRef,
        text,
        resetOptions,
        media,
        setText,
        removeImageHandler,
    };
};
