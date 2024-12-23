import { BiCheckCircle } from "react-icons/bi";
import { PiPencil } from "react-icons/pi";
import { SlStar } from "react-icons/sl";

import { MainLayout } from "../../layouts/MainLayout/MainLayout";

import { useUiStore } from "../../hooks/useUiStore";

export const VideoClippedView = (): JSX.Element => {
  const { onSetVideoDownloaded } = useUiStore();

  const handleClickGoBack: React.MouseEventHandler<HTMLButtonElement> = () => {
    onSetVideoDownloaded(false);
  };

  return (
    <MainLayout className="flex flex-col items-center justify-center">
      <div className="relative">
        <SlStar
          className="absolute -top-18 -left-12"
          fontSize={32}
          fill="white"
        ></SlStar>
        <PiPencil
          fontSize={64}
          fill="white"
          className="absolute -top-12 left-28"
        ></PiPencil>
        <BiCheckCircle fontSize={128} fill="white"></BiCheckCircle>
      </div>

      <h2 className="text-white text-xl font-semibold mt-4">
        Congratulations on creating your clip!
      </h2>

      <p className="text-white text-base mt-2 text-center">
        Your clip is being processed and will be ready shortly.
      </p>

      <button
        type="button"
        className="text-white bg-[#F31B11] p-2 w-[15rem] rounded-full mt-48"
        aria-label="go back"
        onClick={handleClickGoBack}
      >
        Go back
      </button>
    </MainLayout>
  );
};
