import { UserProfilePageComponent } from "@/components/page-components/UserProfile";
import { getMyProfile } from "@/apis/user";
import { getUserProfile } from "@/apis/user";
import { getCookie } from "@/helpers/getCookie";
import { printToastErrorMessages } from "@/helpers/displayToasts";
import { notFound, redirect } from "next/navigation";
import { getCompletedQuestsByOwnerId, getQuestsByOwnerId } from "@/apis/quests";
import { toast } from "react-toastify";
import { DEFAULT_FIELD_ERROR } from "@/apis/responses/common/failure.interface";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const token = await getCookie("token");

    const getUserProfileHandler = async () => {
        try {
            const data = await getUserProfile(id);

            if ("statusCode" in data) {
                if (data.statusCode === 400) {
                    printToastErrorMessages(
                        data.errors.map((err) => err.message),
                    );

                    return null;
                } else if (data.statusCode === 401) {
                    return null;
                }

                return null;
            }
            return { ...data, createdQuests: [], completedQuests: [] };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const profile = await getUserProfileHandler();
    if (!profile) notFound();

    const getIsReqeusterAdmin = async () => {
        try {
            const profile = await getMyProfile();

            if (!("statusCode" in profile) && profile.isAdmin) {
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const isAdmin = token ? await getIsReqeusterAdmin() : false;

    const getOwnQuests = async () => {
        try {
            const data = await getQuestsByOwnerId(id);
            return data.quizzes;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const getCompletedQuests = async () => {
        try {
            return await getCompletedQuestsByOwnerId(id);
        } catch (error) {
            console.error(error);
            toast.error(DEFAULT_FIELD_ERROR.message);
            return [];
        }
    };

    const ownQuests = await getOwnQuests();
    const completedQuests = await getCompletedQuests();

    return (
        <UserProfilePageComponent
            ownQuests={ownQuests}
            completedQuests={completedQuests}
            isEditable={isAdmin}
            profile={profile}
        />
    );
};

export default UserProfile;
