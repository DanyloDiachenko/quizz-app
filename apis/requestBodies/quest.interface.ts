import { SortType } from "@/types/quest.interface";

export interface GetQuestsQuery {
    sortType?: SortType;
    titleFilter?: string;
}

export interface CreateQuestBody {
    quiz: {
        title: string;
        description: string;
        duration: number;
        questions: {
            questionId: string;
            title: string;
            type: number;
            options: {
                title: string;
                isCorrect: boolean;
            }[];
        }[];
    };
}

interface SubmitQuestOptionAnswerOption {
    optionId: string | undefined;
    text: string | undefined;
}
interface SubmitQuestOption {
    questionId: string;
    questionType: number;
    answers: SubmitQuestOptionAnswerOption[];
}
export type SubmitQuestRequestBody = SubmitQuestOption[];

export interface EditQuestBody {
    title: string;
    description: string;
    duration: number;
}

export interface EditQuestionBody {
    text: string;
    type: number;
}

export type EditQuestionsBody = {
    id: string;
    text: string;
    type: number;
    quizId: string;
    options: {
        title: string;
        isCorrect: boolean;
        questionId: string;
    }[];
}[];
