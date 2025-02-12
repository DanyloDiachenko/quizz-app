import { QuestionWhileTesting } from "@/types/question.interface";

export interface ProgressBarProps {
    questions: QuestionWhileTesting[];
    questionsCompleted: number[];
    currentQuestionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
}
