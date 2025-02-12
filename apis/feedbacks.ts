import { fetchApi } from "./fetchApi";
import { CreateFeeedbackRequestBody } from "./requestBodies/feedback.interface";
import { CreateFeedbackResponse } from "./responses/feedback.type";

export const createFeedback = async (
    body: CreateFeeedbackRequestBody,
): Promise<CreateFeedbackResponse> =>
    fetchApi({
        endpoint: "/feedback/",
        isAuthRequired: true,
        method: "POST",
        body,
    });
