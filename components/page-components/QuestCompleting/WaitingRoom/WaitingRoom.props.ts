import { QuestWithoutQuestions } from "@/types/quest.interface";

export interface WaitingRoomProps {
    onStartQuestClick: () => void;
    quest: QuestWithoutQuestions;
}
