import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface LeftColumnProfileProps {
    profile: Profile;
    isEditable: boolean;
    completedQuests: Quest[];
    ownQuests: Quest[];
    isSelfProfile: boolean;
}
