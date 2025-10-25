import { Modal } from "@src/entities/app";

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onResetForm: () => void;
};

export type UseScreenDetector = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export type UseUiStore = {
  modal: Modal;
  videoDownloaded: boolean;
  loading: boolean;
  onSetVideoDownloaded: (boolean: boolean) => void;
  onSetLoading: (boolean: boolean) => void;
  onOpenModal: (modal: Modal) => void;
  onResetModal: () => void;
};
