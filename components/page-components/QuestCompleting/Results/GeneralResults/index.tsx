import { IoTrophyOutline } from "react-icons/io5";
import { GeneralResultsProps } from "./GeneralResults.props";

export const GeneralResults = ({
    result,
    quest,
    timeSpent,
}: GeneralResultsProps) => {
    const timeSpentInMinutes = Math.ceil(timeSpent / 60);

    return (
        <div className="bg-blackOpacity p-6 rounded-lg">
            <div className="text-xl font-bold">Ваші результати</div>
            <div className="mt-4 pb-2 border-b-2 border-gray border-opacity-10 relative ">
                <ul className="text-md xsm:text-lg">
                    <li>
                        Правильних відповідей:{" "}
                        <span className="text-purple">
                            {result?.correctAnswers}
                        </span>{" "}
                        / {result?.totalQuestions}
                    </li>
                    <li className="mt-1">
                        Час проходження:{" "}
                        <span className="text-purple">
                            {Math.ceil(timeSpent / 60)}
                        </span>{" "}
                        хв
                    </li>
                </ul>
                <IoTrophyOutline className="absolute -top-12 xsm:top-auto right-0 xsm:bottom-0 size-9 text-purple" />
            </div>
            <ul className="xsm:flex-row flex-wrap-reverse flex gap-3 mt-4">
                {timeSpentInMinutes < quest.duration / 2 && (
                    <li className="text-yellow p-1 px-2 border-2 border-purple rounded-md max-w-fit">
                        Спрінтер
                    </li>
                )}
                {result?.correctAnswers === result?.totalQuestions && (
                    <li className="text-yellow p-1 px-2 border-2 border-purple rounded-md max-w-fit">
                        Макс бал
                    </li>
                )}
            </ul>
        </div>
    );
};
