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

export type Modal = {
  title: string;
  message: string;
  buttonText: string;
  open: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// TYPES HOOKS
export type UseScreenDetector = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};

export type UseUiStore = {
  modal: Modal;
  videoDownloaded: boolean;
  loading: boolean;
  handleLoading: () => void;
  handleVideoDownloaded: () => void;
  handleModal: (
    title: string,
    message: string,
    buttonText: string,
    open: boolean
  ) => void;
};

// Interface Props
export interface InputProps {
  type: string;
  className: string;
  placeholder: string;
  id: string;
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface LabelProps {
  labelText: string;
  className: string;
}

export interface InputGroupProps {
  className: string;
  children: React.ReactNode;
}

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Interface Payload
export interface UiPayload {
  setModal: {
    title: string;
    message: string;
    buttonText: string;
    open: boolean;
  };
}
