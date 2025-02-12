import { ProgressBarProps } from "./ProgressBar.props";

export const ProgressBar = ({
    questions,
    questionsCompleted,
    setCurrentQuestionIndex,
    currentQuestionIndex,
}: ProgressBarProps) => {
    return (
        <div
            className="absolute w-full top-0 left-0 right-0 grid z-10"
            style={{
                gridTemplateColumns: `repeat(${questions.length}, 1fr)`,
            }}
        >
            {questions.map((_, index) => (
                <button
                    key={index}
                    className={`h-6 flex items-center justify-center font-semibold transition-all ${
                        questionsCompleted.includes(index) ||
                        index === currentQuestionIndex
                            ? "bg-purple text-white cursor-pointer"
                            : "text-gray-700 cursor-not-allowed"
                    }`}
                    disabled={
                        !questionsCompleted.includes(index) &&
                        index !== currentQuestionIndex
                    }
                    onClick={() => setCurrentQuestionIndex(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};
