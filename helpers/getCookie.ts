export const getCookie = async (name: string): Promise<string | null> => {
    if (typeof document === "undefined") {
        const { cookies } = await import("next/headers");

        const cookieData = (await cookies()).get(name);

        return cookieData ? cookieData.value : null;
    } else {
        const cookieData = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`));

        return cookieData ? cookieData.split("=")[1] : null;
    }
};
