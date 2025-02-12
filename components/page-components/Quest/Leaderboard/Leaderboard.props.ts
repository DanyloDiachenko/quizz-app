import { LeaderboardUser } from "@/types/quest.interface";

export interface LeaderboardProps {
    leaderboard: LeaderboardUser[];
    questDuration: number;
}
