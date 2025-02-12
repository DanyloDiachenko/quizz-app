"use client";

import { register } from "@/apis/auth";
import { RegisterRequestBody } from "@/apis/requestBodies/auth.interface";
import {
    DEFAULT_FIELD_ERROR,
    RequestError,
} from "@/apis/responses/common/failure.interface";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/helpers/cn";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { setCookie } from "@/helpers/setCookie";
import { validateEmail } from "@/helpers/validateEmail";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "react-toastify";

const translateErrorMessage = (errorMessage: string) => {
    switch (errorMessage) {
        case "Password must be at least 8 characters":
            return "Пароль повинен містити принаймні 8 символів";
        case "Password must contain at least one uppercase letter":
            return "Пароль повинен містити принаймні одну велику літеру";
        case "Password must contain at least one number":
            return "Пароль повинен містити принаймні одну цифру";
        case "Password must contain at least one special character":
            return "Пароль повинен містити принаймні один спеціальний символ";
        default:
            return errorMessage;
    }
};
const alreadyTakenEmailError = {
    message: "Ця пошта вже зайнята",
    field: "This email is already taken",
};

export const RegisterPageComponent = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async (
        registerRequestBody: RegisterRequestBody,
    ): Promise<RequestError[]> => {
        try {
            const res = await register(registerRequestBody);

            if ("jwtToken" in res) {
                setCookie("token", res.jwtToken);
                return [];
            }
            if (
                "message" in res &&
                res.message === alreadyTakenEmailError.field
            ) {
                return [alreadyTakenEmailError];
            }

            return res.errors.map((error) => ({
                field: "",
                message: translateErrorMessage(error.message),
            }));
        } catch (error) {
            console.error(error);
            return [DEFAULT_FIELD_ERROR];
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.confirmPassword.trim()
        ) {
            toast.error("Заповніть усі поля");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Ваша пошта не є поштою");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Паролі не співпадають");
            return;
        }

        setIsLoading(true);
        const results = await registerUser({
            email: formData.email,
            password: formData.password,
        });
        setIsLoading(false);

        if (results.length === 0) {
            toast.success("Вас успішно зареєстровано!");
            router.refresh();

            const timeout = setTimeout(() => {
                router.push("/profile");
                clearTimeout(timeout);
            }, 1000);
        } else {
            printToastErrorMessages(results.map((res) => res.message));
        }
    };

    return (
        <div className="container sm:mt-12 mt-6 flex flex-col place-items-center">
            <h1>Реєстрація</h1>
            <form
                onSubmit={onSubmit}
                className="flex flex-col place-items-center"
            >
                <div className="space-y-2 sm:mt-10 mt-6">
                    <Input
                        placeholder="Ваша пошта..."
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <Input
                        placeholder="Придумайте надійний пароль..."
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                    <Input
                        placeholder="Повторіть пароль..."
                        type="password"
                        name="new-password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </div>
                <Button
                    color="purpleBackground"
                    type="submit"
                    className={cn(
                        "px-10 sm:px-20 text-lg mt-5 sm:mt-16",
                        isLoading && "opacity-70",
                    )}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <ImSpinner2 className="size-6 animate-spin text-gray" />
                    )}{" "}
                    <span>Реєстрація</span>
                </Button>
            </form>
        </div>
    );
};
