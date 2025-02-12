"use client";
import { ReturnBtn } from "@/components/ui/ReturnBtn";
import { UserProfileProps } from "./UserProfile.props";
import { CompletedQuests } from "@/components/common/tables/CompletedQuests";
import { OwnQuests } from "@/components/common/tables/OwnQuests";
import { cn } from "@/helpers/cn";
import { ProfileForm } from "@/components/common/ProfileForm";
import { LeftColumnProfile } from "@/components/common/LeftColumnProfile";
import { motion } from "framer-motion";
import { slideFromBottomAnimation } from "@/helpers/animation";
import { printUserNickname } from "@/helpers/printUserNickname";

export const UserProfilePageComponent = ({
    isEditable,
    profile,
    ownQuests,
    completedQuests,
}: UserProfileProps) => {
    return (
        profile && (
            <motion.div {...slideFromBottomAnimation} className="mt-8">
                <h1>
                    Профіль користувача{" "}
                    {printUserNickname(profile.firstName, profile.lastName)}
                </h1>
                <ReturnBtn className="mt-4" />
                <div
                    className={cn(
                        "mt-8 grid gap-6 grid-cols-1 items-start",
                        isEditable
                            ? "sm:grid-cols-[240px_auto] 2xl:grid-cols-[240px_330px_auto]"
                            : "grid-cols-1 xl:grid-cols-[240px_auto]",
                    )}
                >
                    <LeftColumnProfile
                        isSelfProfile={false}
                        profile={profile}
                        isEditable={isEditable}
                        completedQuests={completedQuests}
                        ownQuests={ownQuests}
                    />
                    {isEditable && (
                        <ProfileForm
                            profile={profile}
                            isEditSelfProfile={false}
                        />
                    )}
                    <div className="overflow-hidden">
                        <OwnQuests
                            profile={profile}
                            ownQuests={ownQuests}
                            isCreatedByMe={false}
                            isEditable={isEditable}
                        />
                        <CompletedQuests
                            profile={profile}
                            isCompletedByMe={false}
                            completedQuests={completedQuests}
                        />
                    </div>
                </div>
            </motion.div>
        )
    );
};
