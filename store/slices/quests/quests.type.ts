import { Feedback } from "@/types/feedback.interface";
import { ChoiceOption, Question } from "@/types/question.interface";
import { User } from "@/types/user.interface";

export interface QuestsState {
    quest: CreateQuest | null;
    questions: Question[] | null;
    options: ChoiceOption[] | null;
    activeQuestionId: string | null;
    removedQuestions: string[] | null;
}

export interface CreateQuest {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    rate: number;
    imageUrl: string;
    passCount: number;
    duration: number;
    owner: User;
    feedbacks: Feedback[];
    questions: Question[];
}
