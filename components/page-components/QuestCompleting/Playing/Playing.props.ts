import { QuestionWhileTesting } from "@/types/question.interface";
import { Profile } from "@/types/user.interface";

export interface PlayingProps {
    questions: QuestionWhileTesting[];
    onCompleteTest: () => void;
    setUserAnswers: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;
    timeLeft: number | null;
    user: Profile;
}
