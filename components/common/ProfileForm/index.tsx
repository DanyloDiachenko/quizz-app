"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormEvent, useState } from "react";
import { updateUserProfile } from "@/apis/user";
import { toast } from "react-toastify";
import { DEFAULT_FIELD_ERROR } from "@/apis/responses/common/failure.interface";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { useRouter } from "next/navigation";
import { ProfileFormProps } from "./ProfileForm.props";
import { MAX_FIRSTNAME_LENGTH, MAX_LASTNAME_LENGTH } from "@/constants";

export const ProfileForm = ({
    profile,
    isEditSelfProfile,
}: ProfileFormProps) => {
    const router = useRouter();

    const [userData, setUserData] = useState({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
    });

    const updateUserDataHandler = async (updateForm: FormData) => {
        try {
            const data = await updateUserProfile(updateForm);

            if ("statusCode" in data) {
                if (data.statusCode === 400) return data.errors;
                if (data.statusCode === 401)
                    return [{ field: "", message: data.message }];
                return [DEFAULT_FIELD_ERROR];
            }

            return [];
        } catch (error) {
            console.error(error);
            return [DEFAULT_FIELD_ERROR];
        }
    };

    const onUpdateProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!userData.firstName && !userData.lastName) return;

        if (userData.firstName.length > MAX_FIRSTNAME_LENGTH)
            return toast.error("Ім'я не має перевищувати 50 символів!");

        if (userData.lastName.length > MAX_LASTNAME_LENGTH)
            return toast.error("Прізвище не має перевищувати 75 символів!");

        const formData = new FormData();
        formData.append("firstName", userData.firstName);
        formData.append("lastName", userData.lastName);
        formData.append("avatar", new File([], "", { type: "image/png" }));

        if (!isEditSelfProfile) {
            formData.append("userId", profile.id);
        }

        const result = await updateUserDataHandler(formData);

        if (result.length === 0) {
            toast.success(
                isEditSelfProfile
                    ? "Профіль успішно оновлено"
                    : `Дані користувача ${userData.firstName} ${userData.lastName} успішно оновлено`,
            );
            router.refresh();
        } else {
            printToastErrorMessages(result.map((res) => res.message));
        }
    };

    return (
        <div className="p-4 bg-blackOpacity rounded-md">
            <form onSubmit={onUpdateProfileSubmit}>
                <div>
                    <label htmlFor="email" className="text-gray">
                        {isEditSelfProfile
                            ? "Ваша пошта"
                            : `Пошта користувача ${profile.firstName} ${profile.lastName}`}
                    </label>
                    <Input
                        id="email"
                        placeholder={profile.email}
                        disabled
                        className="mt-2"
                        type="email"
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="firstName" className="text-gray">
                        {isEditSelfProfile ? "Ваше імʼя" : "Імʼя користувача"}
                    </label>
                    <Input
                        type="text"
                        id="firstName"
                        placeholder="Введіть ім'я..."
                        value={userData.firstName}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                firstName: e.target.value,
                            })
                        }
                        className="mt-2"
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor="lastName" className="text-gray">
                        {isEditSelfProfile
                            ? "Ваше прізвище"
                            : "Прізвище користувача"}
                    </label>
                    <Input
                        type="text"
                        id="lastName"
                        placeholder="Введіть прізвище..."
                        value={userData.lastName}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                lastName: e.target.value,
                            })
                        }
                        className="mt-2"
                    />
                </div>

                <Button
                    type="submit"
                    color="purpleBackground"
                    className="mt-6 mx-auto mb-2"
                >
                    Зберегти зміни
                </Button>
            </form>
        </div>
    );
};
