"use client";

import { useState } from "react";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { IoTrophyOutline } from "react-icons/io5";
import { getAchievements } from "@/helpers/getAchievements";
import { RenderRating } from "@/helpers/RenderRating";
import { Button } from "@/components/ui/Button";
import { deleteUserAvatar, updateUserProfile } from "@/apis/user";
import { toast } from "react-toastify";
import {
    DEFAULT_FIELD_ERROR,
    RequestError,
} from "@/apis/responses/common/failure.interface";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { useRouter } from "next/navigation";
import { DeleteProfile } from "./DeleteProfile";
import Image from "next/image";
import { LeftColumnProfileProps } from "./LeftColumnProfile.props";
import { setCookie } from "@/helpers/setCookie";
import { motion } from "framer-motion";
import { popAnimation } from "@/constants";

export const LeftColumnProfile = ({
    profile,
    isEditable,
    completedQuests,
    ownQuests,
    isSelfProfile,
}: LeftColumnProfileProps) => {
    const router = useRouter();
    const achievements = getAchievements(profile, completedQuests, ownQuests);

    const [avatar, setAvatar] = useState<string | null>(profile.avatar ?? null);

    const updateAvatarHandler = async (
        imageData: File,
    ): Promise<RequestError[]> => {
        const formData = new FormData();
        formData.append("avatar", imageData);
        formData.append("userId", profile.id);

        try {
            const data = await updateUserProfile(formData);
            if ("statusCode" in data) {
                return data.statusCode === 400
                    ? data.errors
                    : [{ field: "", message: data.message }];
            } else {
                setAvatar(data.avatarUrl);
                router.refresh();
                toast.success("Аватар успішно змінено!");
                return [];
            }
        } catch (error) {
            console.error(error);
            return [DEFAULT_FIELD_ERROR];
        }
    };

    const deleteAvatarHandler = async () => {
        try {
            const data = await deleteUserAvatar(profile.id);
            if (!data.isSuccess) {
                printToastErrorMessages(data.errors);
                return;
            }
            toast.success("Аватар видалено успішно!");
            setAvatar(null);
        } catch (error) {
            console.error(error);
            toast.error(DEFAULT_FIELD_ERROR.message);
        }
        router.refresh();
    };

    const onAvatarChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setAvatar(URL.createObjectURL(file));
        const result = await updateAvatarHandler(file);

        if (result.length > 0) {
            printToastErrorMessages(result.map((res) => res.message));
        }
    };

    return (
        <div className="max-w-[400px]">
            <div className="p-4 bg-blackOpacity rounded-md">
                <div className="w-full h-auto aspect-square border border-purple rounded-md p-2 relative">
                    <RenderRating
                        rating={profile.rating}
                        className="gap-[6px] absolute top-1 left-1"
                    />
                    {isEditable && avatar && (
                        <Button
                            className="absolute top-1 right-1 p-1 z-10"
                            onClick={deleteAvatarHandler}
                            color="redBorder"
                            name="Видалити аватар"
                            aria-label="Видалити аватар"
                        >
                            <AiOutlineClose className="size-5" />
                        </Button>
                    )}
                    <motion.div
                        key={avatar}
                        {...popAnimation}
                        className="bg-blackOpacity-dark w-full h-full flex items-center justify-center rounded-md overflow-hidden"
                    >
                        {avatar ? (
                            <>
                                <Image
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                />
                            </>
                        ) : (
                            <AiOutlineUser className="text-purple size-20" />
                        )}
                    </motion.div>
                </div>
                {isEditable && (
                    <label className="underline text-purple mt-2 text-center block cursor-pointer">
                        Змінити аватар
                        <input
                            type="file"
                            accept=".png,.jpeg"
                            className="hidden"
                            onChange={onAvatarChange}
                        />
                    </label>
                )}
                <div className="mt-2 text-center text-xl font-semibold">
                    {profile.firstName || ""} {profile.lastName || ""}
                </div>
                <div className="mt-6 pb-4 border-b-2 border-b-gray-300 border-opacity-10 relative">
                    <ul className="flex flex-col justify-start gap-2">
                        {achievements.unlocked.map((achiev, index) => (
                            <li
                                key={index}
                                className="bg-blackOpacity-dark text-yellow border-2 border-purple p-1 rounded-md w-fit inline-block"
                            >
                                {achiev}
                            </li>
                        ))}
                    </ul>
                    <IoTrophyOutline className="absolute right-0 bottom-0 text-purple size-8" />
                </div>
                <ul className="mt-4 flex flex-col gap-2">
                    {achievements.locked.map((achiev, index) => (
                        <li
                            key={index}
                            className="bg-blackOpacity-dark text-yellow border-2 border-purple p-1 opacity-50 text-sm rounded-md w-fit inline-block"
                        >
                            {achiev}
                        </li>
                    ))}
                </ul>
            </div>
            {isEditable && (
                <DeleteProfile
                    profile={profile}
                    isSelfProfile={isSelfProfile}
                />
            )}
        </div>
    );
};
