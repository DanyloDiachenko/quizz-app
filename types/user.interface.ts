export interface User {
    id: string;
    avatar: string | null;
    email: string;
    firstName: string | null;
    isAdmin: boolean;
    lastName: string;
    rating: number;
}

export interface Profile extends User {}
