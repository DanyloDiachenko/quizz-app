"use client";

import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaGoogle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/constants";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    return (
        <div className="flex place-content-center place-items-center h-full overflow-hidden">
            <motion.div
                key={pathname}
                {...slideFromBottomAnimation}
                className="container p-4 sm:p-8 bg-blackOpacity rounded-lg flex flex-col max-w-xl"
            >
                <div>
                    <ReturnBtn />
                </div>
                {children}
            </motion.div>
        </div>
    );
};

export default AuthLayout;
