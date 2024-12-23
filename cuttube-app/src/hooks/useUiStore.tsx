import { Modal } from "../entities/vite-env";

import {
  resetModal,
  setLoading,
  setModal,
  setVideoDownloaded,
} from "../store/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../constants/redux";

type UseUiStore = {
  modal: Modal;
  videoDownloaded: boolean;
  loading: boolean;
  onSetVideoDownloaded: (boolean: boolean) => void;
  onSetLoading: (boolean: boolean) => void;
  onOpenModal: (modal: Modal) => void;
  onResetModal: () => void;
};

export const useUiStore = (): UseUiStore => {
  const { modal, loading, videoDownloaded } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();

  const onSetLoading = (boolean: boolean) => {
    dispatch(setLoading(boolean));
  };

  const onOpenModal = (modal: Modal): void => {
    dispatch(setModal(modal));
  };

  const onResetModal = (): void => {
    dispatch(resetModal());
  };

  const onSetVideoDownloaded = (boolean: boolean): void => {
    dispatch(setVideoDownloaded(boolean));
  };

  return {
    modal: modal,
    loading: loading,
    videoDownloaded: videoDownloaded,
    onSetVideoDownloaded: onSetVideoDownloaded,
    onSetLoading: onSetLoading,
    onOpenModal: onOpenModal,
    onResetModal: onResetModal,
  };
};
