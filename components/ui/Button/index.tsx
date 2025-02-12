import { cn } from "@/helpers/cn";
import { ButtonProps } from "./Button.props";

export const Button = ({
    color,
    className,
    children,
    ...rest
}: ButtonProps) => {
    const colorStyles = {
        purpleBackground: "bg-purple text-white hover:bg-purple-light",
        purpleBorder: "border-2 border-purple hover:text-purple text-white",
        yellowBorder: "border-2 border-yellow hover:text-yellow-light text-white",
        redBorder: "border-2 border-red text-red hover:text-red-light",
    };

    return (
        <button
            className={cn(
                "p-3 px-4 flex items-center justify-center rounded-lg duration-300 gap-3",
                color && colorStyles[color],
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
};
