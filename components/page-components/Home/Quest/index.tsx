import Image from "next/image";
import Link from "next/link";
import { RenderRating } from "@/helpers/RenderRating";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { printUserNickname } from "@/helpers/printUserNickname";
import { FaImage, FaUser } from "react-icons/fa";
import { formatDate } from "@/helpers/formatDate";
import { QuestProps } from "./Quest.props";

export const Quest = ({ quest }: QuestProps) => {
    return (
        <div className="bg-blackOpacity-dark hover:scale-105 transition duration-200 rounded-lg">
            {quest.imageUrl ? (
                <Image
                    src={quest.imageUrl}
                    alt={quest.title}
                    className="w-full h-[150px] object-cover rounded-t-lg"
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            ) : (
                <div className="w-full h-[150px] bg-gray-dark flex items-center justify-center rounded-t-lg">
                    <FaImage className="text-white size-12" />
                </div>
            )}
            <div className="p-3">
                <Link
                    href={`/quests/${quest.id}`}
                    className="font-semibold text-lg"
                >
                    {quest.title}
                </Link>
                <RenderRating rating={quest.rate} className="mt-1 gap-[4px]" />
                <div className="mt-3 text-sm">
                    від{" "}
                    <Link href={`/users/${quest.owner.id}`}>
                        {printUserNickname(
                            quest.owner.firstName,
                            quest.owner.lastName,
                        )}
                    </Link>{" "}
                    ({quest.owner.rating || 0} з 5)
                </div>
                <div className="flex items-center justify-between text-gray mt-10">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1">
                            <FaUser />
                            {quest.passCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <MdOutlineAccessTimeFilled />
                            {quest.duration} хв.
                        </span>
                    </div>

                    <span>{formatDate(quest.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};
