"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { LeaderboardProps } from "./Leaderboard.props";
import { getTimeInMinutes } from "@/helpers/getTimeInMinutes";
import { printUserNickname } from "@/helpers/printUserNickname";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/helpers/animation";

export const Leaderboard = ({
    leaderboard,
    questDuration,
}: LeaderboardProps) => {
    return (
        <motion.div
            {...slideFromBottomAnimation}
            className="overflow-x-auto bg-blackOpacity pt-4 rounded-lg h-auto"
        >
            <h2 className="text-white text-lg font-semibold mb-4 ml-4">
                Таблиця лідерів ({leaderboard.length})
            </h2>
            {leaderboard.length ? (
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse">
                        <thead>
                            <tr className="bg-[#242A4D] text-gray-light">
                                <th className="w-[50px] px-4 py-3 text-left">
                                    №
                                </th>
                                <th className="w-[200px] px-4 py-3 text-left">
                                    Нікнейм
                                </th>
                                <th className="w-[80px] px-4 py-3 text-left">
                                    Аватар
                                </th>
                                <th className="w-[150px] px-4 py-3 text-left">
                                    Час
                                </th>
                                <th className="w-[120px] px-4 py-3 text-left">
                                    Правильність
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((player, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-dark bg-blackOpacity-dark text-white"
                                >
                                    <td className="w-[50px] px-4 py-2">
                                        <span
                                            className={`${
                                                index === 0
                                                    ? "text-yellow"
                                                    : index === 1
                                                    ? "text-gray-light"
                                                    : index === 2
                                                    ? "text-orange-700"
                                                    : "text-gray"
                                            } font-semibold`}
                                        >
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="w-[200px] px-4 py-2 truncate">
                                        <Link
                                            href={`/users/${player.user.id}`}
                                            className="text-purple"
                                        >
                                            {printUserNickname(
                                                player.user.firstName,
                                                player.user.lastName,
                                            )}
                                        </Link>
                                    </td>
                                    <td className="w-[80px] px-4 py-2">
                                        <div className="w-10 h-10 rounded-md border border-purple flex items-center justify-center p-1">
                                            {player.user.avatar ? (
                                                <Image
                                                    src={player.user.avatar}
                                                    alt="Avatar"
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : (
                                                <AiOutlineUser className="text-purple size-6" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="w-[150px] px-4 py-2 text-gray-light">
                                        {Math.ceil(player.timeSpent / 60)} /{" "}
                                        {questDuration} хв.
                                    </td>
                                    <td className="w-[120px] px-4 py-2 text-gray-light">
                                        {player.accuracy.toFixed(0)} / 100 %
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-gray bg-blackOpacity-dark p-4">
                    Ніхто ще не пройшов цей квест
                </div>
            )}
        </motion.div>
    );
};
