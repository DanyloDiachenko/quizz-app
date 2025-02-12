export interface RequestError {
    field: string;
    message: string;
}

export interface RequestErrorDelete {
    isSuccess: boolean;
    errors: string[];
}

export const DEFAULT_FIELD_ERROR: RequestError = {
    field: "",
    message: "Відбулась помилка. Спробуйте пізніше",
};
