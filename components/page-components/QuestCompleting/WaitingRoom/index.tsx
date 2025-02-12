"use client";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { TbArrowBackUp } from "react-icons/tb";
import { WaitingRoomProps } from "./WaitingRoom.props";
import { useRedirect } from "@/hooks/useRedirect";
import { FaImage } from "react-icons/fa";

export const WaitingRoom = ({ onStartQuestClick, quest }: WaitingRoomProps) => {
    const redirect = useRedirect();
    return (
        <>
            <div className="bg-blackOpacity pt-6">
                <Button
                    color="purpleBorder"
                    onClick={() => redirect("/")}
                    className="ml-5"
                >
                    <TbArrowBackUp className="size-6" />
                    <span>Повернутися назад</span>
                </Button>
                <div>
                    {quest.imageUrl ? (
                        <Image
                            src={quest.imageUrl}
                            alt="Квест"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="mx-auto mt-3 rounded-lg max-w-[800px] px-6"
                        />
                    ) : (
                        <FaImage className="max-w-[400px] w-full h-auto px-6 mt-3 mx-auto" />
                    )}

                    <h1 className="py-10 text-center">{quest.title}</h1>
                </div>
            </div>
            <Button
                color="purpleBackground"
                className="mt-4 mx-auto max-w-[200px] w-full mb-10"
                onClick={onStartQuestClick}
            >
                Почати квест
            </Button>
        </>
    );
};
