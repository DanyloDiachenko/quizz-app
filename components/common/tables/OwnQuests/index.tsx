"use client";

import Link from "next/link";
import { OwnQuestsProps } from "./OwnQuests.props";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/Button";
import { printUserNickname } from "@/helpers/printUserNickname";
import { setQuest, setQuestions } from "@/store/slices/quests";
import { toggleModal } from "@/store/slices/modals";
import { deleteQuest, getQuestById } from "@/apis/quests";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate } from "@/helpers/formatDate";

export const OwnQuests = ({
    profile,
    isCreatedByMe,
    isEditable,
    ownQuests,
}: OwnQuestsProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const getQuest = async (id: string) => {
        try {
            const response = await getQuestById(id);

            if (response.quiz) {
                dispatch(setQuest(response.quiz));
                dispatch(setQuestions(response.quiz.questions));
            }
        } catch (error) {
            console.log(error);
            toast.error("Помилка завантаження квесту, спробуйте пізніше");
        }
    };

    const onQuestEditClick = async (id: string) => {
        await getQuest(id);

        dispatch(toggleModal("QuestEdit"));
    };

    const deleteHandler = async (id: string) => {
        try {
            await deleteQuest(id);

            dispatch(setQuest(null));
            toast.success("Квест успішно видалено!");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Помилка видалення квесту, спробуйте пізніше");
        }
    };

    return (
        ownQuests && (
            <div className="bg-blackOpacity rounded-md overflow-x-auto w-full">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl font-semibold text-white">
                        {isCreatedByMe
                            ? "Мої квести"
                            : `Квести користувача ${printUserNickname(
                                  profile.firstName,
                                  profile.lastName,
                              )}`}
                    </h2>
                    {isCreatedByMe && (
                        <Button
                            color="purpleBorder"
                            className="py-2 px-4"
                            onClick={() =>
                                dispatch(toggleModal("QuestCreation"))
                            }
                        >
                            Створити квест
                        </Button>
                    )}
                </div>
                {ownQuests.length ? (
                    <div className="overflow-x-auto w-full">
                        <table className="min-w-max border-collapse text-gray w-full">
                            <thead>
                                <tr className="bg-[#242A4D]">
                                    <th className="p-3 text-left w-[200px]">
                                        Назва
                                    </th>
                                    <th className="p-3 text-left w-[80px]">
                                        Картинка
                                    </th>
                                    <th className="p-3 text-left w-[100px]">
                                        Час
                                    </th>
                                    <th className="p-3 text-left w-[120px]">
                                        К-ість завдань
                                    </th>
                                    <th className="p-3 text-left w-[120px]">
                                        Зіграно раз
                                    </th>
                                    <th className="p-3 text-left w-[120px]">
                                        Рейтинг
                                    </th>
                                    {(isCreatedByMe || isEditable) && (
                                        <th className="p-3 text-left w-[100px]">
                                            Дії
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {ownQuests.map((quest, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-700"
                                    >
                                        <td className="p-3 font-semibold">
                                            <Link
                                                href={`/quests/${quest.id}`}
                                                className="text-purple-400"
                                            >
                                                {quest.title}
                                            </Link>
                                        </td>
                                        <td className="p-3">
                                            <Image
                                                src={quest.imageUrl}
                                                alt={quest.title}
                                                className="w-16 h-12 object-cover rounded-md"
                                                sizes="100vw"
                                                height={0}
                                                width={0}
                                            />
                                        </td>
                                        <td className="p-3">
                                            {quest.duration} хв.
                                        </td>
                                        <td className="p-3">
                                            {quest.taskCount}
                                        </td>
                                        <td className="p-3">
                                            {quest.passCount}
                                        </td>
                                        <td className="p-3">
                                            {quest.rate || 0}
                                        </td>
                                        {(isCreatedByMe || isEditable) && (
                                            <td className="p-3">
                                                <button
                                                    className="p-2 bg-purple-600 rounded-md hover:bg-purple-dark duration-300"
                                                    onClick={() => {
                                                        onQuestEditClick(
                                                            quest.id,
                                                        );
                                                    }}
                                                    name="Редагувати квест"
                                                    aria-label="Редагувати квест"
                                                >
                                                    <AiOutlineEdit className="text-white" />
                                                </button>
                                                <button
                                                    className="p-2 ml-2 bg-red-600 rounded-md hover:bg-red-dark duration-300"
                                                    onClick={() => {
                                                        deleteHandler(quest.id);
                                                    }}
                                                    name="Видалити квест"
                                                    aria-label="Видалити квест"
                                                >
                                                    <AiOutlineDelete className="text-white" />
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-blackOpacity-dark text-gray p-4 rounded-lg">
                        {isCreatedByMe
                            ? `Ви ще не створили жодного квесту`
                            : `Користувач ще не створив жодного квесту`}
                    </div>
                )}
            </div>
        )
    );
};
