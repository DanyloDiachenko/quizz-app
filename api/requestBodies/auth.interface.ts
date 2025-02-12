export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface RegisterRequestBody extends LoginRequestBody {}
