import { RequestError } from "./failure.interface";

export interface BadRequestResponse {
    statusCode: 400;
    errors: RequestError[];
}
