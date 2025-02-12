import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ReduxProvider } from "@/components/providers/Redux";
import { Aside } from "@/components/common/Aside";
import { cn } from "@/helpers/cn";
import { ToastProvider } from "@/components/providers/Toast";
import { getCookie } from "@/helpers/getCookie";
import { getPathname } from "@/helpers/getPathname";
import { Modals } from "@/components/Modals";
import { getMyProfile } from "@/apis/user";
import { setCookie } from "@/helpers/setCookie";
import { LayoutBackground } from "@/components/common/LayoutBackground";

const inter = Inter({
    variable: "--font-inter",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "QuizApp – Інтерактивні вікторини та квізи",
    description:
        "Грай у захопливі вікторини, перевіряй свої знання та змагайся з друзями. Приєднуйся до нашої спільноти та стань справжнім майстром квізів!",
    keywords: "квіз, вікторина, тести, розваги, навчання, знання, гра",
    openGraph: {
        title: "QuizApp – Грай у вікторини та перевіряй свої знання!",
        description:
            "Захопливі квізи та вікторини на будь-яку тему. Змагайся з друзями та стань чемпіоном!",
        type: "website",
        url: "https://quiz-app.vercel.app/",
        images: [
            {
                url: "https://quiz-app.vercel.app/logo.png",
                width: 1200,
                height: 630,
                alt: "QuizApp – Інтерактивні вікторини та квізи",
            },
        ],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
};

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
    const token = await getCookie("token");
    const pathname = await getPathname();

    let profile = null;

    if (!token || !token.length) {
        profile = null;
    } else {
        try {
            const profileData = await getMyProfile();

            if ("email" in profileData) {
                profile = profileData;
            } else {
                profile = null;
                setCookie("token", "");
            }
        } catch (error) {
            console.error(error);
            setCookie("token", "");
        }
    }

    return (
        <html lang="en">
            <body
                className={cn(
                    !pathname.includes("quest-completing")
                        ? "grid grid-cols-[1fr] lg:grid-cols-[320px_1fr] relative"
                        : "",
                    inter.variable,
                )}
            >
                <LayoutBackground />
                <ReduxProvider>
                    {!pathname.includes("quest-completing") && (
                        <Aside profile={profile} />
                    )}
                    <main
                        className={
                            !pathname.includes("quest-completing")
                                ? "sm:p-12 p-6"
                                : ""
                        }
                    >
                        {children}
                    </main>
                    <div className="fixed -z-10 bg-[#8C55FE] bg-opacity-40 w-[550px] h-[550px] -left-[160px] top-0 blur-[500px]"></div>
                    <div className="fixed -z-10 bg-[#00D1FF] bg-opacity-20 w-[550px] h-[550px] left-[50%] top-[50%] blur-[500px] -translate-x-[50%]"></div>
                    <div className="fixed -z-10 bg-[#BD00FF] bg-opacity-20 w-[550px] h-[550px] -right-[150px] -bottom-[100px] blur-[500px]"></div>
                    <Modals />
                    <ToastProvider />
                </ReduxProvider>
            </body>
        </html>
    );
};

export default RootLayout;
