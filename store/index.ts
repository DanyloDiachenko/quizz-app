import { configureStore } from "@reduxjs/toolkit";
import modals from "./slices/modals";
import quests from "./slices/quests";
import aside from "./slices/aside";

export const store = configureStore({
    reducer: { modals, aside, quests },
});
