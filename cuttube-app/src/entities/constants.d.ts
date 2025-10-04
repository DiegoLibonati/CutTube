import { store } from "@src/store/store";

export type Config = {
  apiUrl: string;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
