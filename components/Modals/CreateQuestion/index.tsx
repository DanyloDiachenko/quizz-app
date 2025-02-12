"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { isModalOpened } from "@/helpers/isModalOpened";
import { toast } from "react-toastify";
import { ModalBg } from "../ModalBg";
import { BsFillImageFill } from "react-icons/bs";
import { Select } from "@/components/ui/Select";
import { useQuestionModal } from "@/hooks/useQuestionModal";
import { Question } from "@/types/question.interface";
import { useEffect } from "react";
import {
    addQuestion,
    setOptions,
    setQuestionActiveId,
} from "@/store/slices/quests";
import { motion } from "framer-motion";
import { FaImage, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import {
    MAX_TITLE_LENGTH,
    popAnimation,
    popAnimationWithTransform,
} from "@/constants";
import Image from "next/image";

export const CreateQuestion = () => {
    const {
        dispatch,
        fileInputRef,
        modals,
        onFileUpload,
        options,
        questionType,
        questionTypes,
        renderGetAnswer,
        setQuestionType,
        question,
        text,
        resetOptions,
        media,
        setText,
        removeImageHandler,
    } = useQuestionModal();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const type = Number(questionType?.value);

        if (text.length > MAX_TITLE_LENGTH)
            return toast.error(
                "Довжина питання не може бути більше 100 символів!",
            );

        if (!options?.length)
            return toast.error("Не забудьте додати варіанти відповідей!");

        if (!text.length) return toast.error("Спочатку заповніть усі поля!");

        const question: Question = {
            id: window.crypto.randomUUID(),
            text,
            type,
            choiceOptions: options,
            mediaUrl: media ? media : undefined,
        };

        dispatch(addQuestion(question));
        resetOptions("QuestionCreation", "Питання створено!");
    };

    useEffect(() => {
        if (modals.includes("QuestionCreation")) {
            dispatch(setOptions(null));
            dispatch(setQuestionActiveId(null));
        }
    }, [modals]);

    return (
        isModalOpened("QuestionCreation", modals) && (
            <>
                <motion.div
                    {...popAnimationWithTransform}
                    className="max-h-[95vh] overflow-y-auto pt-4 fixed left-[50%] -translate-x-[50%] md:max-w-[700px] w-[95%] md:w-full md:top-10 top-4 z-10 bg-blue sm:p-6 flex flex-col rounded-lg bottom-4"
                >
                    <ReturnBtn
                        className="self-start mt-2 mb-10 ml-2 sm:ml-4"
                        modal="QuestionCreation"
                        isPrev
                    />
                    <div className="text-xl sm:text-3xl text-center">
                        Створення Питання
                    </div>
                    <div className="w-full p-4">
                        <div className="relative w-full mt-2">
                            <motion.div key={media} {...popAnimation}>
                                {media || question?.mediaUrl ? (
                                    <>
                                        <Image
                                            src={media || question?.mediaUrl!}
                                            alt="Зображення питання"
                                            className="w-full h-auto aspect-square object-cover"
                                            sizes="100vw"
                                            height={0}
                                            width={0}
                                        />
                                        <Button
                                            className="absolute right-4 p-3 bottom-4 bg-red"
                                            color="redBorder"
                                            type="button"
                                            onClick={() => removeImageHandler()}
                                        >
                                            <FaRegTrashAlt
                                                size={20}
                                                color="white"
                                            />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="w-full h-auto border-2 border-purple aspect-square flex items-center justify-center">
                                        <BsFillImageFill className="size-20 text-gray" />
                                    </div>
                                )}
                            </motion.div>
                            <Input
                                id="media"
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".png"
                                onChange={onFileUpload}
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="text-purple underline cursor-pointer text-center mt-2 flex items-center justify-center gap-2"
                            >
                                <FaImage size={18} /> Змінити картинку
                            </div>
                        </div>
                        <form className="w-full mt-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="name" className="text-gray">
                                    Назва питання
                                </label>
                                <Input
                                    id="name"
                                    value={text}
                                    className="mt-2"
                                    placeholder="Назва питання..."
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label
                                    htmlFor="questionType"
                                    className="text-gray"
                                >
                                    Тип питання
                                </label>
                                <Select
                                    placeholder="Оберіть тип питання..."
                                    activeOption={questionType}
                                    options={questionTypes}
                                    setActiveOption={setQuestionType}
                                    className="mt-2"
                                    id="questionType"
                                />
                            </div>
                            {renderGetAnswer()}
                            <Button
                                color="purpleBackground"
                                type="submit"
                                className="mx-auto px-16 mt-8"
                            >
                                Зберегти
                            </Button>
                        </form>
                    </div>
                </motion.div>
                <ModalBg modal="QuestionCreation" />
            </>
        )
    );
};
