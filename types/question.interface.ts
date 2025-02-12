export interface ChoiceOption {
    index?: number;
    title: string;
    isCorrect: boolean;
}

export interface ChoiceOptionWhileTesting {
    title: string;
    id: string;
    questionId: string;
}

export interface Question {
    id: string;
    text: string;
    type: number;
    choiceOptions: ChoiceOption[];
    mediaUrl?: string;
}

export interface QuestionWhileTesting {
    id: string;
    text: string;
    quizId: string;
    type: number;
    options?: ChoiceOptionWhileTesting[];
    mediaUrl?: string;
}
