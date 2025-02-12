import { Feedback } from "./feedback.interface";
import { Question, QuestionWhileTesting } from "./question.interface";
import { User } from "./user.interface";

export enum SortType {
    Rating = 0,
    NumberOfPasses = 1,
    Alphabet = 2,
    AuthorRating = 3,
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    rate: number;
    imageUrl: string;
    taskCount: number;
    passCount: number;
    duration: number;
    owner: User;
    feedbacks: Feedback[];
    questions: Question[] | QuestionWhileTesting[] | undefined;
}

export interface QuestWithoutQuestions {
    createdAt: string;
    description: string;
    duration: number;
    feedbacks: Feedback[];
    id: string;
    imageUrl: string;
    ownerId: string;
    passCount: number;
    questions: [];
    rate: number | null;
    title: string;
}

export interface CompletedQuest {
    user: User;
    quest: Quest;
    accuracy: number;
    timeSpent: number;
    dateCompleted: string;
}

export interface LeaderboardUser {
    user: User;
    accuracy: number;
    timeSpent: number;
    dateCompleted: string;
}
