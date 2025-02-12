"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { SelectOption } from "@/types/selectOption.interface";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { HomePageComponentProps } from "./Home.props";
import { Quest } from "./Quest";
import { getQuests } from "@/apis/quests";
import { SortType } from "@/types/quest.interface";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ImSpinner2 } from "react-icons/im";

const sortOptions: SelectOption[] = [
    { title: "Рейтингом квесту", value: "testRating" },
    { title: "Кількістю пройдених разів", value: "completedQuantity" },
    { title: "За алфавітом", value: "alphabet" },
    { title: "Рейтингом автора", value: "authorRating" },
];

const sortOptionActionMap: Record<string, SortType> = {
    testRating: SortType.Rating,
    completedQuantity: SortType.NumberOfPasses,
    alphabet: SortType.Alphabet,
    authorRating: SortType.AuthorRating,
};

const bounceAnimation: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export const HomePageComponent = ({ serverQuests }: HomePageComponentProps) => {
    const [sortOption, setSortOption] = useState<SelectOption | null>(null);
    const [searchQuest, setSearchQuest] = useState<string>("");
    const [quests, setQuests] = useState(serverQuests);
    const [isLoading, setIsLoading] = useState(false);

    const processQuestsHandler = async () => {
        const sortType = sortOption
            ? sortOptionActionMap[sortOption.value]
            : undefined;
        const titleFilter = searchQuest.length >= 3 ? searchQuest : undefined;

        try {
            setIsLoading(true);
            const response = await getQuests({ sortType, titleFilter });

            if (response.quizzes) {
                setQuests(response.quizzes);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (sortOption || searchQuest.length >= 3) {
            const timeoutId = setTimeout(() => {
                processQuestsHandler();
            }, 500);

            return () => clearTimeout(timeoutId);
        }

        if (!searchQuest) {
            setQuests(serverQuests);
        }
    }, [sortOption, searchQuest]);

    return (
        <>
            <h1 className="mt-12">Квести</h1>
            <div className="flex items-center gap-8">
                <Link href="/profile" className="mt-3 duration-0">
                    <Button color="purpleBorder">
                        <span>Створити свій квест</span>
                        <IoCreateOutline className="size-6" />
                    </Button>
                </Link>
            </div>
            <div className="flex gap-4 mt-10 flex-col xsm:flex-row">
                <Input
                    placeholder="Пошук (більше 3 символів)..."
                    className="xsm:max-w-[300px] max-w-none"
                    value={searchQuest}
                    onChange={(e) => setSearchQuest(e.target.value)}
                />
                <Select
                    options={sortOptions}
                    activeOption={sortOption}
                    setActiveOption={setSortOption}
                    id="sort-select"
                    placeholder="Сортувати за..."
                    className="xsm:max-w-[300px] max-w-none"
                />
                {isLoading && (
                    <ImSpinner2 className="size-8 animate-spin text-gray" />
                )}
            </div>
            <>
                <div className="mt-4 text-gray">
                    <span className="text-white font-bold">
                        {quests.length}
                    </span>{" "}
                    результатів знайдено
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-7 mt-6">
                    {quests.length ? (
                        <AnimatePresence>
                            {quests.map((quest, index) => (
                                <motion.div
                                    key={quest.id}
                                    layout
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={bounceAnimation}
                                    transition={{
                                        delay: index * 0.1,
                                    }}
                                >
                                    <Quest key={index} quest={quest} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="text-gray text-sm">
                            Квестів не знайдено
                        </div>
                    )}
                </div>
            </>
        </>
    );
};
