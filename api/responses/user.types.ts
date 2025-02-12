import { Profile, User } from "@/types/user.interface";
import { BadRequestResponse } from "./common/badRequest.interface";
import { UnathorizedResponse } from "./common/unathorized.interface";
import { DeleteResponseSuccess } from "./common/deleteSuccess.interface";
import { RequestErrorDelete } from "./common/failure.interface";

export interface UpdateUserResponseSuccess {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

export interface GetProfileResponseSuccess extends Profile {}

export type GetProfileResponse =
    | GetProfileResponseSuccess
    | BadRequestResponse
    | UnathorizedResponse;

export type UpdateUserResponse =
    | UpdateUserResponseSuccess
    | BadRequestResponse
    | UnathorizedResponse;

export type DeleteUserResponse = DeleteResponseSuccess | BadRequestResponse;

export type DeleteUserAvatarResponse =
    | DeleteResponseSuccess
    | RequestErrorDelete;
