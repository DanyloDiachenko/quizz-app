import { BadRequestResponse } from "./common/badRequest.interface";
import { UnathorizedResponse } from "./common/unathorized.interface";

export interface RegisterUserResponseSuccess {
    jwtToken: string;
}

export interface LoginUserResponseSuccess extends RegisterUserResponseSuccess { }

export type LoginResponse =
    | LoginUserResponseSuccess
    | BadRequestResponse
    | UnathorizedResponse;

export type RegisterResponse = RegisterUserResponseSuccess | BadRequestResponse;
