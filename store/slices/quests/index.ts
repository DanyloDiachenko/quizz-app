import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChoiceOption, Question } from "@/types/question.interface";
import { CreateQuest, QuestsState } from "./quests.type";

const initialState: QuestsState = {
    quest: null,
    questions: null,
    options: null,
    activeQuestionId: null,
    removedQuestions: null,
};

const quests = createSlice({
    name: "quests",
    initialState,
    reducers: {
        setQuest: (state, action: PayloadAction<CreateQuest | null>) => {
            return {
                ...state,
                quest: action.payload,
            };
        },
        setQuestions: (state, action: PayloadAction<Question[] | null>) => {
            return {
                ...state,
                questions: action.payload,
            };
        },

        setOptions: (state, action: PayloadAction<ChoiceOption[] | null>) => {
            return {
                ...state,
                options: action.payload,
            };
        },
        setQuestionActiveId: (state, action: PayloadAction<string | null>) => {
            return {
                ...state,
                activeQuestionId: action.payload,
            };
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            return {
                ...state,
                questions: state.questions
                    ? [...state.questions, action.payload]
                    : [action.payload],
            };
        },

        removeQuestion: (state, action: PayloadAction<string>) => {
            const questions = state.questions!.filter(
                (q) => q.id !== action.payload,
            );

            return {
                ...state,
                questions,
                removedQuestions: state.removedQuestions
                    ? [...state.removedQuestions, action.payload]
                    : [action.payload],
            };
        },

        removeQuestionImage: (state, action: PayloadAction<string>) => {
            const questions = state.questions!.filter(
                (q) => q.id !== action.payload,
            );

            const question = state.questions?.find(
                (q) => q.id === action.payload,
            )!;

            return {
                ...state,
                questions: [
                    ...questions,
                    {
                        ...question,
                        mediaUrl: undefined,
                    },
                ],
            };
        },

        editQuestion: (state, action: PayloadAction<Question>) => {
            const filtered = state.questions!.filter(
                (q) => q.id !== state.activeQuestionId,
            );

            return {
                ...state,
                questions: state.questions
                    ? [...filtered, action.payload]
                    : [action.payload],
            };
        },

        addOption: (state, action: PayloadAction<ChoiceOption>) => {
            return {
                ...state,
                options: state.options
                    ? [...state.options, action.payload]
                    : [action.payload],
            };
        },
        editOption: (state, action: PayloadAction<ChoiceOption>) => {
            const filtered = state.options!.filter(
                (o) => o.index !== action.payload.index,
            );
            return {
                ...state,
                options: state.options
                    ? [...filtered, action.payload]
                    : [action.payload],
            };
        },
        removeOption: (state, action: PayloadAction<number>) => {
            if (state.options) {
                const options = state.options.filter(
                    (o) => o.index !== action.payload,
                );
                return {
                    ...state,
                    options,
                };
            }
        },
    },
    selectors: {
        selectQuest: (state) => state.quest,
        selectQuestions: (state) => state.questions,
        selectActiveQuestion: (state) =>
            state.activeQuestionId
                ? state.questions?.find((q) => q.id === state.activeQuestionId)
                : null,
        selectOptions: (state) => state.options,
        selectRemovedQuestions: (state) => state.removedQuestions,
    },
});

export const {
    selectQuest,
    selectOptions,
    selectActiveQuestion,
    selectQuestions,
    selectRemovedQuestions,
} = quests.selectors;

export const {
    setQuest,
    setQuestions,
    setOptions,
    addQuestion,
    editQuestion,
    addOption,
    editOption,
    removeOption,
    setQuestionActiveId,
    removeQuestion,
    removeQuestionImage,
} = quests.actions;

export default quests.reducer;
