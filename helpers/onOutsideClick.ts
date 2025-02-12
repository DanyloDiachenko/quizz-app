import { RefObject, useEffect } from "react";

export const onOutsideClick = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, callback]);
};
