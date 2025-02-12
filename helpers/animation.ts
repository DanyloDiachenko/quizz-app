export const popAnimationWithTransform = {
    initial: {
        opacity: 0,
        scale: 0.6,
        x: "-50%",
    },
    animate: {
        opacity: 1,
        scale: 1,
        x: "-50%",
    },
    transition: {
        duration: 0.4,
        type: "spring",
        bounce: 0.5,
    },
};

export const popAnimation = {
    initial: {
        opacity: 0,
        scale: 0.6,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
    transition: {
        duration: 0.4,
        type: "spring",
        bounce: 0.5,
    },
};

export const slideFromSidesAnimation = {
    initial: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        transition: {
            duration: 1,
            ease: "easeInOut",
        },
    }),
};

export const slideFromBottomAnimation = {
    initial: { y: "50%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "50%", opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
};

export const slideFromRightAnimation = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: "100%",
        opacity: 0,
    },
    transition: {
        duration: 0.7,
        ease: "easeInOut",
    },
};
