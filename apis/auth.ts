import { fetchApi } from "./fetchApi";
import {
    LoginRequestBody,
    RegisterRequestBody,
} from "./requestBodies/auth.interface";
import { LoginResponse, RegisterResponse } from "./responses/auth.type";

export const register = async (
    body: RegisterRequestBody,
): Promise<RegisterResponse> =>
    fetchApi({
        endpoint: "/auth/register",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });

export const login = async (body: LoginRequestBody): Promise<LoginResponse> =>
    fetchApi({
        endpoint: "/auth/login",
        isAuthRequired: false,
        method: "POST",
        body: body,
    });
