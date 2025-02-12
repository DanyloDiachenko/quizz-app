import { Profile } from "@/types/user.interface";

export interface ChatProps {
    isOpened: boolean;
    setIsOpened: (isOpened: boolean) => void;
    user: Profile;
}