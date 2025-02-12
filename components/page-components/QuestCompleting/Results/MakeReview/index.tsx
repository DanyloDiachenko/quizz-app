"use client";

import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { MakeReviewProps } from "./MakeReview.props";
import { toast } from "react-toastify";
import { createFeedback } from "@/api/feedbacks";
import { printToastErrorMessages } from "@/helpers/displayToasts";

export const MakeReview = ({ quest }: MakeReviewProps) => {
    const [rating, setRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [isSended, setIsSended] = useState<boolean>(false);

    const handleStarClick = (starIndex: number) => {
        setRating(starIndex + 1);
    };

    const onReviewSubmitClick = async () => {
        if (isSended) {
            toast.error("Ви вже надіслали відгук!");
            return;
        }

        if (!rating || !review.trim()) {
            toast.error("Заповніть текст відгуку та рейтинг!");
            return;
        }

        try {
            const response = await createFeedback({
                rate: rating,
                text: review,
                quizId: quest.id,
            });

            if ("quizId" in response) {
                setIsSended(true);
                toast.success("Відгук успішно надіслано!");

                setRating(0);
                setReview("");

                return;
            }
            if ("errors" in response) {
                printToastErrorMessages(
                    response.errors.map((error) => error.message),
                );
                return;
            }
            if ("message" in response) {
                toast.error(response.message);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-blackOpacity p-6 rounded-lg mb-4">
            <div className="text-xl font-bold mb-4">Оцініть цей квест</div>
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <IoStar
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={`cursor-pointer ${
                            index < rating ? "text-yellow-500" : "text-gray-400"
                        } text-2xl ml-[6px] first:ml-0`}
                    />
                ))}
            </div>
            <Textarea
                className="mt-6"
                placeholder="Текст відгуку..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <Button
                color="purpleBackground"
                className="mt-6"
                onClick={onReviewSubmitClick}
            >
                <IoIosSend className="size-6" />
                <span>Надіслати</span>
            </Button>
        </div>
    );
};
