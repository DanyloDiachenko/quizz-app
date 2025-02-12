import { Quest, QuestWithoutQuestions } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export interface QuestCompletingProps {
    quest: QuestWithoutQuestions;
    user: Profile;
}
