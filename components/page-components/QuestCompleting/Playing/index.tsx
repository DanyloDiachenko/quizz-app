"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChoiceQuestion } from "./ChoiceQuestion";
import { InputQuestion } from "./InputQuestion";
import { BooleanQuestion } from "./BooleanQuestion";
import { ProgressBar } from "./ProgressBar";
import { InfoBox } from "./InfoBox";
import { Chat } from "./Chat";
import { toast } from "react-toastify";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { PlayingProps } from "./Playing.props";
import { motion } from "framer-motion";
import { slideFromSidesAnimation } from "@/constants";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

export const PlayingGame = ({
    questions,
    onCompleteTest,
    userAnswers,
    setUserAnswers,
    timeLeft,
    user,
}: PlayingProps & {
    userAnswers: Record<number, any>;
    setUserAnswers: React.Dispatch<React.SetStateAction<Record<number, any>>>;
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionsCompleted, setQuestionsCompleted] = useState<number[]>([]);
    const [isChatOpened, setIsChatOpened] = useState(false);
    const direction = useRef<number>(0);

    const currentQuestion = questions[currentQuestionIndex];

    const setCurrentQuestionIndexHandler = (index: number) => {
        setCurrentQuestionIndex((prev) => {
            if (index > prev) {
                direction.current = 1;
            } else if (index < prev) {
                direction.current = -1;
            } else {
                direction.current = 0;
            }
            return index;
        });
    };

    const onAnswerChange = (answer: any) => {
        setUserAnswers((prev) => {
            const newAnswers = { ...prev, [currentQuestionIndex]: answer };
            return newAnswers;
        });

        setQuestionsCompleted((prevCompleted) => {
            return prevCompleted.includes(currentQuestionIndex)
                ? prevCompleted
                : [...prevCompleted, currentQuestionIndex];
        });
    };

    const onNextQuestionClick = () => {
        if (userAnswers[currentQuestionIndex] === undefined) {
            toast.error("Ви не обрали відповідь!");
            return;
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            direction.current = 1;
        } else {
            onCompleteTest();
        }
    };

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case 0:
                return (
                    <BooleanQuestion
                        onAnswerChange={onAnswerChange}
                        initialAnswer={userAnswers[currentQuestionIndex]}
                    />
                );
            case 1:
                return (
                    <ChoiceQuestion
                        question={currentQuestion}
                        onAnswerChange={onAnswerChange}
                        initialAnswer={userAnswers[currentQuestionIndex] || []}
                    />
                );
            case 2:
                return (
                    <InputQuestion
                        onAnswerChange={onAnswerChange}
                        initialAnswer={
                            (userAnswers[currentQuestionIndex] as string) || ""
                        }
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative">
            <button
                className="absolute left-4 top-4 md:left-8 md:top-8 bg-[#261035] p-3 rounded-md cursor-pointer z-20"
                onClick={() => setIsChatOpened(true)}
            >
                <IoChatbubbleEllipsesSharp className="text-purple size-5 md:size-8" />
            </button>
            <Chat
                isOpened={isChatOpened}
                setIsOpened={setIsChatOpened}
                user={user}
            />
            <ProgressBar
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndexHandler}
                questionsCompleted={questionsCompleted}
                questions={questions}
            />
            <motion.div
                key={currentQuestionIndex}
                custom={direction.current}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={slideFromSidesAnimation}
            >
                <div className="bg-blackOpacity pt-16 px-4 relative">
                    <InfoBox
                        timeLeft={timeLeft as number}
                        questionsLength={questions.length}
                        currentQuestionIndex={currentQuestionIndex}
                    />
                    {currentQuestion.mediaUrl ? (
                        <Image
                            src={currentQuestion.mediaUrl}
                            alt="Питання"
                            className="mx-auto mt-3 rounded-lg w-full max-w-[400px]"
                            sizes="100vw"
                            height={0}
                            width={0}
                        />
                    ) : (
                        <div className="max-w-[400px] mx-auto flex items-center justify-center rounded-lg">
                            <FaImage className="size-80" />
                        </div>
                    )}
                    <h1 className="pt-10 pb-5 text-center text-xl xsm:text-3xl">
                        {currentQuestion.text}
                    </h1>
                </div>
                {renderQuestion()}
                <Button
                    color="purpleBackground"
                    className="mt-6 mx-auto max-w-[200px] w-full mb-10"
                    onClick={onNextQuestionClick}
                >
                    {currentQuestionIndex === questions.length - 1
                        ? "Завершити тест"
                        : "Наступне питання"}
                </Button>
            </motion.div>
        </div>
    );
};
