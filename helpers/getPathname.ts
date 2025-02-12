import { headers } from "next/headers";

export const getPathname = async () => {
    return (await headers()).get("x-next-pathname") as string;
};
