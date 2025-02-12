import { Quest } from "@/types/quest.interface";
import { Profile } from "@/types/user.interface";

export const getAchievements = (
    profile: Profile,
    completedQuests: Quest[],
    ownQuests: Quest[],
) => {
    const possibleAchievements = [
        { name: "Топ рейтинг", condition: profile.rating >= 4 },
        { name: "Квестер 1", condition: completedQuests.length >= 1 },
        { name: "Квестер 2", condition: completedQuests.length >= 3 },
        { name: "Квестер 3", condition: completedQuests.length >= 5 },
        {
            name: "Майстер квестів 1",
            condition: ownQuests.length >= 1,
        },
        {
            name: "Майстер квестів 2",
            condition: ownQuests.length >= 3,
        },
        {
            name: "Майстер квестів 3",
            condition: ownQuests.length >= 5,
        },
        { name: "Дослідник 1", condition: completedQuests.length >= 1 },
        { name: "Дослідник 2", condition: completedQuests.length >= 3 },
        { name: "Дослідник 3", condition: completedQuests.length >= 5 },
    ];

    const unlockedAchievements = possibleAchievements
        .filter((ach) => ach.condition)
        .map((ach) => ach.name);

    const lockedAchievements = possibleAchievements
        .filter((ach) => !ach.condition)
        .map((ach) => ach.name);

    return { unlocked: unlockedAchievements, locked: lockedAchievements };
};
