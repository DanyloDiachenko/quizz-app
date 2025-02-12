"use client";

import { useRedirect } from "@/hooks/useRedirect";

const NotFound = () => {
    const redirect = useRedirect();

    return (
        <div className="mt-10 text-center">
            <h1>Упс!</h1>
            <div className="text-xl">Такої сторінки не знайдено</div>
            <button
                onClick={() => redirect("/")}
                className="text-purple hover:text-purple-dark duration-300 mt-5"
            >
                Повернутися на головну...
            </button>
        </div>
    );
};

export default NotFound;
