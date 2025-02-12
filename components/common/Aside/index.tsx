"use client";

import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { selectAside, setIsAsideOpened } from "@/store/slices/aside";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { Button } from "@/components/ui/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutBoxLine } from "react-icons/ri";
import Image from "next/image";
import { setCookie } from "@/helpers/setCookie";
import { toast } from "react-toastify";
import { AsideProps, Links, TitleType } from "./Aside.props";
import { GiThink } from "react-icons/gi";

export const Aside = ({ profile }: AsideProps) => {
    const links: Links = [
        { title: "Усі квести", link: "/" },
        {
            title: "Створити квест",
            link: profile ? "/profile" : "/login",
            modal: "QuestCreation",
        },
        { title: "Мій кабінет", link: profile ? "/profile" : "/login" },
        { title: "Я адміністратор", link: profile ? "/profile" : "/login" },
    ];

    const router = useRouter();
    const dispatch = useAppDispatch();
    const aside = useAppSelector(selectAside);

    const [activeLink, setActiveLink] = useState<TitleType | null>(null);

    const setIsAsideOpenedHandler = (value: boolean) => {
        dispatch(setIsAsideOpened(value));
    };

    const onLogoutClick = () => {
        setCookie("token", "");
        toast.success("Ви успішно вийшли з акаунту!");
        router.refresh();
    };

    return (
        <>
            <Button
                color="purpleBorder"
                onClick={() => setIsAsideOpenedHandler(true)}
                className="absolute top-2 left-2 lg:hidden p-2"
            >
                <RxHamburgerMenu className="size-6" />
            </Button>
            {aside && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={() => setIsAsideOpenedHandler(false)}
                />
            )}
            <aside
                className={`min-h-[100vh] h-full top-0 left-0 bottom-0 w-[300px] fixed lg:relative lg:w-full z-50 lg:z-0 bg-[#10091b] lg:bg-blackOpacity-dark p-2 xsm:p-4 shadow-lg 
                transition-transform duration-300 ${
                    aside ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="xsm:mt-10 mt-4">
                    <Link
                        href="/"
                        className="mx-4 text-white text-2xl flex items-center gap-2"
                        onClick={() => setActiveLink("Усі квести")}
                    >
                        <GiThink className="size-12" />
                        <span>QuizzApp</span>
                    </Link>
                    {!profile ? (
                        <div className="flex mt-4 xsm:mt-8 mx-4 items-center gap-4 bg-blackOpacity p-2">
                            <div className="p-1 w-12 h-12 border-purple border-2 rounded-md xsm:p-3 flex justify-center items-center">
                                <AiOutlineUser className="text-purple size-6" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    className="text-yellow hover:text-yellow-light"
                                    href="/login"
                                    onClick={() =>
                                        setIsAsideOpenedHandler(false)
                                    }
                                >
                                    Увійти
                                </Link>
                                <div className="w-[1px] h-8 bg-gray-dark"></div>
                                <Link
                                    href="/register"
                                    onClick={() =>
                                        setIsAsideOpenedHandler(false)
                                    }
                                >
                                    Реєстрація
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex mt-4 xsm:mt-8 mx-4 gap-4 bg-blackOpacity p-2 relative">
                            {profile.isAdmin && (
                                <div className="absolute text-yellow -left-2 -top-4 text-sm font-bold">
                                    * Адміністратор *
                                </div>
                            )}
                            <div className="p-2 w-12 h-12 border-purple border-2 rounded-md flex justify-center items-center">
                                {!profile.avatar ? (
                                    <AiOutlineUser className="text-purple size-6" />
                                ) : (
                                    <Image
                                        src={profile.avatar}
                                        alt={
                                            (profile.firstName || "") +
                                            " " +
                                            (profile.lastName || "")
                                        }
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full"
                                    />
                                )}
                            </div>
                            <div>
                                <Link href="/profile" className="text-white">
                                    {!profile.firstName && !profile.lastName
                                        ? "Користувач"
                                        : `${profile.firstName || ""} ${
                                              profile.lastName || ""
                                          }`}
                                </Link>
                                <button
                                    onClick={onLogoutClick}
                                    className="text-gray-dark flex items-center gap-1 text-sm mt-1"
                                >
                                    <RiLogoutBoxLine />
                                    <span>Log out</span>
                                </button>
                            </div>
                        </div>
                    )}
                    <nav className="mt-4 xsm:mt-8 text-lg">
                        <ul>
                            {links.map((link, index) => (
                                <li
                                    className="relative flex items-center mt-5 transition-all"
                                    key={index}
                                >
                                    <Link
                                        href={link.link}
                                        className="ml-2 text-white"
                                        onClick={() =>
                                            setActiveLink(link.title)
                                        }
                                    >
                                        {link.title}
                                    </Link>
                                    <div
                                        className={`absolute -left-2 xsm:-left-4 flex items-center transition-all duration-300 ${
                                            activeLink === link.title
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                    >
                                        <div className="w-[4px] h-10 bg-purple"></div>
                                        <div className="w-4 h-6 bg-purple blur-md"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};
