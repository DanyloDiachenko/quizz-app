"use client";

import Link from "next/link";
import { CompletedQuestsProps } from "./CompletedQuests.props";
import { printUserNickname } from "@/helpers/printUserNickname";
import Image from "next/image";

export const CompletedQuests = ({
    profile,
    isCompletedByMe,
    completedQuests,
}: CompletedQuestsProps) => {
    return (
        completedQuests && (
            <div className="bg-blackOpacity rounded-md mt-6 overflow-x-auto w-full">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-white">
                        {isCompletedByMe
                            ? "Пройдені квести"
                            : `Пройдені квести користувачем ${printUserNickname(
                                  profile.firstName,
                                  profile.lastName,
                              )}`}
                    </h2>
                </div>
                {completedQuests.length ? (
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
                                    <th className="p-3 text-left w-[150px]">
                                        Затрачений час
                                    </th>
                                    <th className="p-3 text-left w-[150px]">
                                        Правильність
                                    </th>
                                    <th className="p-3 text-left w-[150px]">
                                        Дата
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedQuests.map((completed, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-700"
                                    >
                                        <td className="p-3 font-semibold">
                                            <Link
                                                href={`/quests/${completed.id}`}
                                                className="text-purple-400"
                                            >
                                                {completed.title}
                                            </Link>
                                        </td>
                                        <td className="p-3">
                                            <Image
                                                src={completed.imageUrl}
                                                alt={completed.title}
                                                className="w-16 h-12 object-cover rounded-md"
                                                sizes="100vw"
                                                height={0}
                                                width={0}
                                            />
                                        </td>
                                        <td className="p-3">"37 / 60 хв."</td>
                                        <td className="p-3">"87 / 100 %"</td>
                                        <td className="p-3">"13.02.2025"</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-blackOpacity-dark text-gray p-4 rounded-lg">
                        {isCompletedByMe
                            ? `Ви ще не пройшли жодного квесту`
                            : `Користувач ще не пройшов жодного квесту`}
                    </div>
                )}
            </div>
        )
    );
};
