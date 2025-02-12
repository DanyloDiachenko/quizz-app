import {
    ChoiceOptionWhileTesting,
    QuestionWhileTesting,
} from "@/types/question.interface";

export interface ChoiceQuestionProps {
    question: QuestionWhileTesting;
    onAnswerChange: (answer: ChoiceOptionWhileTesting[]) => void;
    initialAnswer: ChoiceOptionWhileTesting[];
}
