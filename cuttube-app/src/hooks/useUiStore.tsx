import { Modal } from "@src/entities/app";
import { UseUiStore } from "@src/entities/hooks";

import {
  resetModal,
  setLoading,
  setModal,
  setVideoDownloaded,
} from "@src/features/ui/uiSlice";

import { useAppDispatch, useAppSelector } from "@src/app/hooks";

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
