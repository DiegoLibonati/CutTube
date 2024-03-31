import { Modal } from "../components/Modal/Modal";
import { NavBar } from "../components/NavBar/NavBar";
import { SideNav } from "../components/SideNav/SideNav";
import { useScreenDetector } from "../hooks/useScreenDetector";
import { useUiStore } from "../hooks/useUiStore";
import { CreateClipView } from "../views/CreateClipView";
import { LoadingView } from "../views/LoadingView";
import { VideoClippedView } from "../views/VideoClippedView";

export const CutPage = (): JSX.Element => {
  // Hooks
  const { isTablet, isDesktop } = useScreenDetector();
  const { modal, loading, videoDownloaded } = useUiStore();

  return (
    <div className={`flex w-full min-h-screen`}>
      {isTablet || isDesktop ? <SideNav></SideNav> : <NavBar></NavBar>}

      {loading ? (
        <LoadingView></LoadingView>
      ) : videoDownloaded ? (
        <VideoClippedView></VideoClippedView>
      ) : (
        <CreateClipView></CreateClipView>
      )}

      {modal.open ? <Modal></Modal> : null}
    </div>
  );
};
