import { QuestionType } from "@/types/question.type";

export const parseQuestionType = (type: QuestionType) => {
    switch (type) {
        case "boolean":
            return 0;

        case "choice":
            return 1;

        case "input":
            return 2;

        default:
            return -1;
    }
};
