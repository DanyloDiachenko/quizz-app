export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("uk-UK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
