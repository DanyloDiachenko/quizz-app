import { LeaderboardUser } from "@/types/quest.interface";
import { NotFoundResponse } from "./common/notFound.interface";

export type GetLeaderboardByQuestIdResponseSuccess = LeaderboardUser[];

export type GetLeaderboardByQuestIdResponse =
    | GetLeaderboardByQuestIdResponseSuccess
    | NotFoundResponse;
