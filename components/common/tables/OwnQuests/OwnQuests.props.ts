import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface OwnQuestsProps {
    profile: Profile;
    isCreatedByMe: boolean;
    ownQuests?: Omit<Quest, "createdAt">[];
    isEditable: boolean;
}
