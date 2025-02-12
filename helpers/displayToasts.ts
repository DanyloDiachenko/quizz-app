import { toast } from "react-toastify";

export const printToastErrorMessages = (errorMessages: string[]) => {
    errorMessages.forEach((messageText) => {
        toast.error(messageText);
    });
};
