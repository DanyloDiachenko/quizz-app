"use client";

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate,
} from "framer-motion";
import { useEffect } from "react";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const LayoutBackground = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(150% 160% at 55% 0%, #020617 55%, ${color})`;

    return (
        <motion.main
            style={{ backgroundImage }}
            className="fixed w-screen h-screen z-[-1]"
        ></motion.main>
    );
};
