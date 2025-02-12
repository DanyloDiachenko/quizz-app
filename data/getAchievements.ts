import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export const getAchievements = (
    profile: Profile,
    completedQuests: Quest[],
    ownQuests: Quest[],
) => {
    const possibleAchievements = [
        { name: "Топ рейтинг", condition: profile.rating >= 5 },
        { name: "Квестер", condition: completedQuests.length >= 10 },
        {
            name: "Майстер квестів",
            condition: ownQuests.length >= 5,
        },
        { name: "Дослідник", condition: completedQuests.length >= 5 },
    ];

    const unlockedAchievements = possibleAchievements
        .filter((ach) => ach.condition)
        .map((ach) => ach.name);

    const lockedAchievements = possibleAchievements
        .filter((ach) => !ach.condition)
        .map((ach) => ach.name);

    return { unlocked: unlockedAchievements, locked: lockedAchievements };
};
