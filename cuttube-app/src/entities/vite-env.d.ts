/// <reference types="vite/client" />

import { store } from "../store/store";

// TYPES
export type FormClip = {
  startTime: string;
  endTime: string;
  clipTitle: string;
  youtubeLink: string;
};

export type UiState = {
  loading: boolean;
  modal: Modal;
  videoDownloaded: boolean;
};

// Interface Props

export interface GeneralProps {
  children?: React.ReactNode;
  className?: string;
}





// NEW

export type Config = {
  apiUrl: string;
};

export type Modal = {
  title: string;
  message: string;
  buttonText: string;
  open: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
