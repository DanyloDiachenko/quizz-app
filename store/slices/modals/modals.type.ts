export type ModalType =
    | "QuestCreation"
    | "QuestEdit"
    | "QuestionCreation"
    | "QuestionEdit";

export type ModalState = {
    active: ModalType[];
    deleteCofirmationTitle?: string;
    prev?: ModalType;
};
