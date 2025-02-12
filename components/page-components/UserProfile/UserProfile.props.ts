import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface UserProfileProps {
    isEditable: boolean;
    profile: Profile;
    ownQuests: Quest[];
    completedQuests: Quest[];
}
