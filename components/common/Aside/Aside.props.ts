import { ModalType } from "@/store/slices/modals/modals.type";
import { Profile } from "@/types/user.interface";

export interface AsideProps {
    profile: Profile | null;
}

export type Links = {
    title: TitleType;
    link: LinkType;
    modal?: ModalType;
}[];

type LinkType = "/" | "/profile" | "/login";

export type TitleType =
    | "Усі квести"
    | "Створити квест"
    | "Мій кабінет"
    | "Я адміністратор";
