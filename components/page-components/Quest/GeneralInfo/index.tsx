"use client";

import Image from "next/image";
import { GeneraInfoProps } from "./GeneralInfo.props";
import { Button } from "@/components/ui/Button";
import { FaUser } from "react-icons/fa6";
import { RenderRating } from "@/helpers/RenderRating";
import Link from "next/link";
import { useRedirect } from "@/hooks/useRedirect";
import { FaImage } from "react-icons/fa";
import { printUserNickname } from "@/helpers/printUserNickname";
import { formatDate } from "@/helpers/formatDate";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";

export const GeneralInfo = ({ quest }: GeneraInfoProps) => {
    const redirect = useRedirect();

    return (
        <motion.div
            {...slideFromBottomAnimation}
            className="bg-blackOpacity rounded-md"
        >
            {quest.imageUrl ? (
                <Image
                    src={quest.imageUrl}
                    alt={quest.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-t-md"
                />
            ) : (
                <div className="w-full h-[250px] bg-gray-dark flex items-center justify-center rounded-t-lg">
                    <FaImage className="text-white size-12" />
                </div>
            )}
            <div className="p-4">
                <div className="text-purple text-lg font-bold">
                    {quest.title}
                </div>
                <div className="flex gap-5 mt-4">
                    <Button
                        className="bg-purple gap-2"
                        color="purpleBackground"
                        onClick={() =>
                            redirect(`/quest-completing/${quest.id}`)
                        }
                    >
                        <FaUser className="size-4" />
                        <span>Грати зараз</span>
                    </Button>
                </div>
                <div className="text-gray mt-2">
                    <span className="font-semibold text-white">
                        {quest.passCount}
                    </span>{" "}
                    разів зіграно,{" "}
                    <span className="font-semibold text-white">
                        {quest.duration}
                    </span>{" "}
                    хв.
                </div>
                <p className="text-gray mt-6">{quest.description}</p>
                <RenderRating rating={quest.rate} className="mt-3 gap-[6px]" />
                <div className="text-gray mt-3">
                    Створено {formatDate(quest.createdAt)}
                </div>
                <div>
                    <span className="text-gray">від </span>
                    <Link href={`/users/${quest.owner.id}`}>
                        {printUserNickname(
                            quest.owner.firstName,
                            quest.owner.lastName,
                        )}
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
