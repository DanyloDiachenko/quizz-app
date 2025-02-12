import { BadRequestResponse } from "./common/badRequest.interface";
import { UnathorizedResponse } from "./common/unathorized.interface";

export interface CreateFeedbackResponseSuccess {
    createdAt: string;
    feedbackId: string;
    quizId: string;
    rate: number;
    text: string;
}

export type CreateFeedbackResponse =
    | BadRequestResponse
    | UnathorizedResponse
    | CreateFeedbackResponseSuccess;
