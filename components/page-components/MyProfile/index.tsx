"use client";
import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { MyProfileProps } from "./MyProfile.props";
import { CompletedQuests } from "@/components/common/tables/CompletedQuests";
import { OwnQuests } from "@/components/common/tables/OwnQuests";
import { ProfileForm } from "@/components/common/ProfileForm";
import { LeftColumnProfile } from "@/components/common/LeftColumnProfile";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/helpers/animation";
export const MyProfilePageComponent = ({
    profile,
    completedQuests,
    ownQuests,
}: MyProfileProps) => {
    return (
        <motion.div {...slideFromBottomAnimation} className="mt-8">
            <h1>Мій кабінет</h1>
            <ReturnBtn className="mt-4" />
            <div className="mt-8 grid grid-cols-[1fr] sm:grid-cols-[240px_auto] 2xl:grid-cols-[240px_330px_auto] gap-6 items-start">
                <div>
                    <LeftColumnProfile
                        profile={profile}
                        completedQuests={completedQuests}
                        ownQuests={ownQuests}
                        isEditable={true}
                        isSelfProfile={true}
                    />
                </div>
                <ProfileForm profile={profile} isEditSelfProfile={true} />
                <div className="grid-cols-1 grid items-start sm:-col-start-3 sm:-col-end-1 2xl:col-start-auto 2xl:col-end-auto">
                    <OwnQuests
                        isCreatedByMe={true}
                        ownQuests={ownQuests}
                        profile={profile}
                        isEditable={true}
                    />
                    <CompletedQuests
                        completedQuests={completedQuests}
                        profile={profile}
                        isCompletedByMe={true}
                    />
                </div>
            </div>
        </motion.div>
    );
};
