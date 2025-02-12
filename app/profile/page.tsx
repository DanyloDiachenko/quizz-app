import { getCompletedQuestsByOwnerId, getQuestsByOwnerId } from "@/apis/quests";
import { getMyProfile } from "@/apis/user";
import { MyProfilePageComponent } from "@/components/page-components/MyProfile";
import { getCookie } from "@/helpers/getCookie";
import { redirect } from "next/navigation";

const MyProfile = async () => {
    const token = await getCookie("token");

    if (!token) {
        redirect("/login");
    }

    const getProfile = async () => {
        try {
            const data = await getMyProfile();

            if ("statusCode" in data) {
                redirect("/login");
            } else {
                return data;
            }
        } catch (error) {
            console.error(error);
            redirect("/login");
        }
    };

    const getOwnQuests = async () => {
        try {
            const data = await getQuestsByOwnerId(profile.id);
            if (data.quizzes) {
                return data.quizzes;
            }

            return [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getCompletedQuests = async () => {
        try {
            return await getCompletedQuestsByOwnerId();
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const profile = await getProfile();
    if (!profile) {
        redirect("/login");
    }

    const ownQuests = await getOwnQuests();
    const completedQuests = await getCompletedQuests();

    return (
        <MyProfilePageComponent
            profile={profile}
            ownQuests={ownQuests}
            completedQuests={completedQuests}
        />
    );
};

export default MyProfile;
