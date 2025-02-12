import { ToastContainer } from "react-toastify";
import { toastSettings } from "./toastSettings";

export const ToastProvider = () => {
    return <ToastContainer {...toastSettings} />;
};
