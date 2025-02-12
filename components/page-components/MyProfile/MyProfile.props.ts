import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface MyProfileProps {
    profile: Profile;
    completedQuests: Quest[];
    ownQuests: Quest[];
}
