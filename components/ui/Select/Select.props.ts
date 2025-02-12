import { SelectOption } from "@/types/selectOption.interface";

export interface SelectProps {
    placeholder: string;
    options: SelectOption[];
    activeOption: SelectOption | null;
    setActiveOption: (option: SelectOption) => void;
    id: string;
    className?: string;
}
