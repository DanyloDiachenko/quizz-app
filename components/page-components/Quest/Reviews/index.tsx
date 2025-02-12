"use client";

import { RenderRating } from "@/helpers/RenderRating";
import { AiOutlineUser } from "react-icons/ai";
import { ReviewsProps } from "./Reviews.props";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/helpers/animation";
import { formatDate } from "@/helpers/formatDate";

export const Reviews = ({ quest }: ReviewsProps) => {
    return (
        <motion.div
            {...slideFromBottomAnimation}
            className="bg-blackOpacity p-4 rounded-lg mt-8"
        >
            <h2 className="text-white text-lg font-semibold mb-4">
                Відгуки ({quest.feedbacks.length})
            </h2>
            <div className="flex flex-col gap-4">
                {quest.feedbacks.length ? (
                    quest.feedbacks.map((review, index) => (
                        <div
                            key={index}
                            className="bg-blackOpacity-dark p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-4"
                        >
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-md border border-purple flex items-center justify-center p-1">
                                        {
                                            <AiOutlineUser className="text-purple size-6" />
                                        }
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div>Користувач</div>
                                    <div className="text-gray-light text-sm">
                                        {formatDate(review.createdAt)}
                                    </div>
                                    <RenderRating
                                        rating={review.rate}
                                        className="mt-2 gap-1"
                                    />
                                </div>
                            </div>
                            <div className="text-gray-light">{review.text}</div>
                        </div>
                    ))
                ) : (
                    <div className="bg-blackOpacity-dark text-gray p-4 rounded-lg">
                        Цей квест ще не має відгуків
                    </div>
                )}
            </div>
        </motion.div>
    );
};
