import { getQuests } from "@/api/quests";
import { HomePageComponent } from "@/components/page-components/Home";
import { Quest } from "@/types/quest.interface";

const Home = async () => {
    let quests: Quest[] = [];

    try {
        const response = await getQuests({});

        if (response.quizzes) {
            quests = response.quizzes;
        }
    } catch (error) {
        console.log(error);
    }

    return <HomePageComponent serverQuests={quests} />;
};

export default Home;
