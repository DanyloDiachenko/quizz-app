"use client";

import { DEFAULT_FIELD_ERROR } from "@/apis/responses/common/failure.interface";
import { deleteUserProfile } from "@/apis/user";
import { Button } from "@/components/ui/Button";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { setCookie } from "@/helpers/setCookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DeleteProfileProps } from "./DeleteProfile.props";

export const DeleteProfile = ({
    profile,
    isSelfProfile,
}: DeleteProfileProps) => {
    const router = useRouter();

    const deleteProfileHandler = async () => {
        try {
            const result = await deleteProfileFetchHandler();

            if (result.length === 0) {
                if (isSelfProfile) {
                    toast.success("Ваш профіль успішно видалено!");
                    setCookie("token", "");
                    router.push("/");
                    setTimeout(() => {
                        router.refresh();
                    }, 500);
                } else {
                    toast.success(
                        `Профіль користувача ${profile?.firstName || ""} ${
                            profile?.lastName || ""
                        } успішно видалено!`,
                    );
                    router.back();
                }
            } else {
                printToastErrorMessages(result.map((res) => res.message));
            }
        } catch (error) {
            toast.error(DEFAULT_FIELD_ERROR.message);
        }
    };

    const deleteProfileFetchHandler = async () => {
        try {
            const data = await deleteUserProfile(profile?.id);

            if ("statusCode" in data && Number(data.statusCode) !== 200) {
                return data.errors;
            }
            return [];
        } catch (error) {
            return [DEFAULT_FIELD_ERROR];
        }
    };

    return (
        <Button
            className="mt-6 w-full"
            color="redBorder"
            onClick={deleteProfileHandler}
        >
            Видалити акаунт
        </Button>
    );
};
