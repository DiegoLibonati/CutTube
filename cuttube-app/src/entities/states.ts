import { Modal } from "@src/entities/app";

export type UiState = {
  loading: boolean;
  modal: Modal;
  videoDownloaded: boolean;
};
