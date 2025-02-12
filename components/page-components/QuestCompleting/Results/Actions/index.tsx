"use client";

import { Button } from "@/components/ui/Button";
import { useRedirect } from "@/hooks/useRedirect";
import Link from "next/link";
import { ActionsProps } from "./Actions.props";

export const Actions = ({ quest }: ActionsProps) => {
    const redirect = useRedirect();

    return (
        <div className="max-w-[300px] mx-auto">
            <Link href="#" className="flex justify-center">
                <Button
                    onClick={() => location.reload()}
                    color="purpleBackground"
                    className="w-full"
                >
                    Спробувати ще раз
                </Button>
            </Link>
            <Button
                color="purpleBorder"
                className="mt-3 w-full"
                onClick={() => redirect("/")}
            >
                Повернутися на головну
            </Button>
            <Button
                color="yellowBorder"
                className="mt-3 w-full"
                onClick={() => redirect(`/users/${quest.ownerId}`)}
            >
                Пройти інший квест цього автора
            </Button>
        </div>
    );
};
