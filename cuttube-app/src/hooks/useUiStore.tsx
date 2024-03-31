import { UseUiStore } from "../entities/vite-env";
import { setLoading, setModal, setVideoDownloaded } from "../store/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useUiStore = (): UseUiStore => {
  const { modal, loading, videoDownloaded } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();

  const handleLoading = (): void => {
    dispatch(setLoading());
  };

  const handleModal = (
    title: string,
    message: string,
    buttonText: string,
    open: boolean
  ): void => {
    dispatch(setModal({ title, message, buttonText, open }));
  };

  const handleVideoDownloaded = (): void => {
    dispatch(setVideoDownloaded());
    return;
  };

  return {
    modal,
    loading,
    videoDownloaded,
    handleVideoDownloaded,
    handleLoading,
    handleModal,
  };
};
