import { SubmitQuestResponseSuccess } from "@/apis/responses/quest.type";
import { Quest, QuestWithoutQuestions } from "@/types/quest.interface";

export interface ResultsProps {
    quest: QuestWithoutQuestions;
    result: SubmitQuestResponseSuccess | null;
    timeSpent: number;
}
