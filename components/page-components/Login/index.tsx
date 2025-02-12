"use client";

import { login } from "@/apis/auth";
import { DEFAULT_FIELD_ERROR } from "@/apis/responses/common/failure.interface";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { setCookie } from "@/helpers/setCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { LoginRequestBody } from "@/apis/requestBodies/auth.interface";
import { ImSpinner2 } from "react-icons/im";
import { validateEmail } from "@/helpers/validateEmail";
import { cn } from "@/helpers/cn";

export const LoginPageComponent = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = async (loginRequestBody: LoginRequestBody) => {
        try {
            const res = await login(loginRequestBody);

            if ("jwtToken" in res) {
                setCookie("token", res.jwtToken);
                return [];
            }

            if ("statusCode" in res) {
                if (res.statusCode === 400) {
                    return res.errors;
                } else if (res.statusCode === 401) {
                    return [
                        {
                            field: "",
                            message:
                                res.message === "Invalid email or password."
                                    ? "Невірна пошта або пароль"
                                    : res.message,
                        },
                    ];
                }
            }
            return [DEFAULT_FIELD_ERROR];
        } catch (error) {
            console.error(error);
            return [DEFAULT_FIELD_ERROR];
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error("Заповніть усі поля");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Ваша пошта не є поштою");
            return;
        }

        setIsLoading(true);
        const results = await loginUser({
            email: formData.email,
            password: formData.password,
        });
        setIsLoading(false);

        if (results.length === 0) {
            toast.success("Вас успішно авторизовано!");

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
            <h1>Авторизація</h1>
            <form onSubmit={onSubmit} className="flex flex-col w-full">
                <div className="space-y-2 sm:mt-10 mt-6">
                    <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Пошта"
                    />
                    <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        placeholder="Пароль"
                    />
                </div>
                <Link
                    href="/register"
                    className="mt-2 text-purple text-start text-sm"
                >
                    Не маєте акаунту? Зареєструйтесь!
                </Link>
                <Button
                    color="purpleBackground"
                    type="submit"
                    className={cn(
                        "px-10 sm:px-20 text-lg mt-5 mx-auto sm:mt-16",
                        isLoading && "opacity-70",
                    )}
                >
                    {isLoading && (
                        <ImSpinner2 className="size-6 animate-spin text-gray" />
                    )}{" "}
                    <span>Увійти</span>
                </Button>
            </form>
        </div>
    );
};
