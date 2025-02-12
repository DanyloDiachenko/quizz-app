export const printUserNickname = (
    firstName: string | null,
    lastName: string | null,
) => {
    if (!firstName && !lastName) {
        return "Користувач";
    }

    return `${firstName || ""} ${lastName || ""}`;
};
