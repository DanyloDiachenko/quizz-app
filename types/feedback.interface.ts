import { User } from "./user.interface";

export interface Feedback {
    id: string;
    rate: number;
    text: string;
    createdAt: string;
    author: User;
}
