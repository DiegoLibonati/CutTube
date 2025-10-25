import { Modal } from "@src/components/Modal/Modal";
import { NavBar } from "@src/components/NavBar/NavBar";
import { SideNav } from "@src/components/SideNav/SideNav";

import { CreateClipView } from "@src/views/CreateClipView/CreateClipView";
import { LoadingView } from "@src/views/LoadingView/LoadingView";
import { VideoClippedView } from "@src/views/VideoClippedView/VideoClippedView";

import { useUiStore } from "@src/hooks/useUiStore";
import { useScreenDetector } from "@src/hooks/useScreenDetector";

export const CutPage = (): JSX.Element => {
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

      {modal.open && <Modal></Modal>}
    </div>
  );
};
