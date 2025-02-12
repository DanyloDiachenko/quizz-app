import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface CompletedQuestsProps {
    profile: Profile;
    isCompletedByMe: boolean;
    completedQuests?: Quest[];
}
