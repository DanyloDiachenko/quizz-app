import { PageProps } from "@/.next/types/app/page";
import { getLeaderboardByQuestId } from "@/apis/leaderboard";
import { getQuestById } from "@/apis/quests";
import { GeneralInfo } from "@/components/page-components/Quest/GeneralInfo";
import { Leaderboard } from "@/components/page-components/Quest/Leaderboard";
import { Reviews } from "@/components/page-components/Quest/Reviews";
import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { LeaderboardUser, Quest } from "@/types/quest.interface";
import Link from "next/link";
import { notFound } from "next/navigation";

const QuestDetails = async ({ params }: PageProps) => {
    const questId = (await params).id;
    let quest: Quest | null = null;
    let leaderboard: LeaderboardUser[] = [];

    try {
        const response = await getQuestById(questId);

        if (response.quiz) {
            quest = response.quiz;
        }
    } catch (error) {
        notFound();
    }

    if (!quest) {
        notFound();
    }

    if (quest) {
        try {
            const response = await getLeaderboardByQuestId(questId);
            if ("error" in response) {
                return;
            }

            leaderboard = response;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Деталі квесту</h1>
            <Link href="#" className="block mt-4">
                <ReturnBtn />
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr] mt-6 gap-8 items-start">
                <GeneralInfo quest={quest} />
                <div className="grid ">
                    <Leaderboard
                        leaderboard={leaderboard}
                        questDuration={quest.duration}
                    />
                    <Reviews quest={quest} />
                </div>
            </div>
        </div>
    );
};

export default QuestDetails;
