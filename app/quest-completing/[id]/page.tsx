import { PageProps } from "@/.next/types/app/page";
import { getQuestById, getQuestByIdWithoutQuestions } from "@/api/quests";
import { getMyProfile } from "@/api/user";
import { QuestCompletingPageComponent } from "@/components/page-components/QuestCompleting";
import { getCookie } from "@/helpers/getCookie";
import { Quest, QuestWithoutQuestions } from "@/types/quest.interface";
import { QuestionWhileTesting } from "@/types/question.interface";
import { Profile } from "@/types/user.interface";
import { notFound, redirect } from "next/navigation";

const QuestCompleting = async ({ params }: PageProps) => {
    const token = await getCookie("token");
    const { id } = await params;
    let user: Profile | null = null;

    if (!token || !token.length) {
        redirect("/login");
    }

    try {
        const profileData = await getMyProfile();

        if ("email" in profileData) {
            user = profileData;
        }
    } catch (error) {
        console.error(error);
        user = null;
    }

    if (!user) {
        redirect("/login");
    }

    let quest: QuestWithoutQuestions | null = null;

    try {
        const response = await getQuestByIdWithoutQuestions(id);

        if (response.id) {
            quest = response;
        } else {
            notFound();
        }
    } catch (error) {
        console.error(error);
        notFound();
    }

    return <QuestCompletingPageComponent quest={quest} user={user} />;
};

export default QuestCompleting;
