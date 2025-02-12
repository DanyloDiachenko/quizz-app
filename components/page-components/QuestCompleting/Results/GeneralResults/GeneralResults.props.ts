import { SubmitQuestResponseSuccess } from "@/apis/responses/quest.type";
import { Quest, QuestWithoutQuestions } from "@/types/quest.interface";

export interface GeneralResultsProps {
    quest: QuestWithoutQuestions;
    result: SubmitQuestResponseSuccess | null;
    timeSpent: number;
}
