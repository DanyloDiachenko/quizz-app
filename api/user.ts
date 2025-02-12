import { fetchApi } from "./fetchApi";
import {
    DeleteUserAvatarResponse,
    DeleteUserResponse,
    GetProfileResponse,
    UpdateUserResponse,
} from "./responses/user.types";

export const getMyProfile = async (): Promise<GetProfileResponse> =>
    fetchApi({
        endpoint: `/user/user-profile`,
        isAuthRequired: true,
        method: "GET",
    });

export const getUserProfile = async (
    userId: string,
): Promise<GetProfileResponse> =>
    fetchApi({
        endpoint: `/user/user-profile/${userId}`,
        isAuthRequired: false,
        method: "GET",
    });

export const updateUserProfile = async (
    body: FormData,
    userId?: string,
): Promise<UpdateUserResponse> =>
    fetchApi({
        endpoint: `/user/user-profile${userId ? `/${userId}` : ""}`,
        isAuthRequired: true,
        method: "PUT",
        body,
    });

export const deleteUserProfile = async (
    userId?: string,
): Promise<DeleteUserResponse> =>
    fetchApi({
        endpoint: `/user/user-profile/${userId ? userId : ""}`,
        isAuthRequired: true,
        method: "DELETE",
    });

export const deleteUserAvatar = async (
    userId?: string,
): Promise<DeleteUserAvatarResponse> =>
    fetchApi({
        endpoint: `/user/user-profile${userId ? `/${userId}` : ""}/image`,
        isAuthRequired: true,
        method: "DELETE",
    });
