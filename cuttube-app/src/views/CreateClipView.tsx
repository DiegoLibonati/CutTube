import { cutVideo } from "../api/cutVideo";
import { removeClip } from "../api/removeClip";
import { Input } from "../components/Input/Input";
import { InputGroup } from "../components/InputGroup/InputGroup";
import { Label } from "../components/Label/Label";
import { FormClip } from "../entities/vite-env";
import { useForm } from "../hooks/useForm";
import { useScreenDetector } from "../hooks/useScreenDetector";
import { useUiStore } from "../hooks/useUiStore";
import { MainLayout } from "../layouts/MainLayout/MainLayout";

export const CreateClipView = (): JSX.Element => {
  // Hooks
  const { formState, onInputChange, onResetForm } = useForm<FormClip>({
    startTime: "",
    endTime: "",
    clipTitle: "",
    youtubeLink: "",
  });
  const { isTablet, isDesktop } = useScreenDetector();
  const { handleLoading, handleModal, handleVideoDownloaded } = useUiStore();

  // Fns
  const handleCreateClip: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    handleLoading();

    const { clipTitle, endTime, startTime, youtubeLink } = formState;

    if (
      !clipTitle.trim() ||
      !youtubeLink.trim() ||
      !endTime.trim() ||
      !startTime.trim()
    ) {
      handleLoading();
      handleModal("Error", "You cannot have empty values", "Close", true);
      onResetForm();
      return;
    }

    const regexTime = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!regexTime.test(endTime) || !regexTime.test(startTime)) {
      handleLoading();
      handleModal(
        "Error",
        "The start of the clip and the end of the clip must have a valid format. Example: 00:10:00",
        "Close",
        true
      );
      onResetForm();
      return;
    }

    const data = await cutVideo(formState);

    if (data instanceof Error){
      handleLoading();
      handleModal(
        "Error",
        data.message,
        "Close",
        true
      );
      onResetForm();
      return 
    }

    if (typeof data === "string") {
      const download = new Promise((resolve, _) => {
        const a = document.createElement("a");

        a.href = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/v1/cut/download/${data}`;
        a.download = `${clipTitle}.mp4`;

        document.body.appendChild(a);

        a.click();
        a.remove();
        resolve(void 0);
      });

      download.then(() => {
        const timeout = setTimeout(async () => {
          await removeClip(data);
          handleLoading();
          handleVideoDownloaded();
        }, 2000);

        return () => clearTimeout(timeout);
      });
    }
  };

  return (
    <MainLayout>
      <h1 className="text-white p-2 font-semibold text-3xl">CutTube</h1>
      <div className="bg-white ml-2 w-12 h-[.2rem]"></div>

      <form
        className={`flex flex-col items-start justify-center p-2 ${
          isTablet || isDesktop ? "w-[60%]" : "w-full"
        }`}
        onSubmit={handleCreateClip}
      >
        <div
          className={`flex w-full ${
            isTablet || isDesktop ? "flex-row" : "flex-col"
          }`}
        >
          <InputGroup className="flex flex-col w-full mt-2 px-2">
            <Label
              className="text-white text-xs font-semibold my-2"
              labelText="Start Time"
            ></Label>
            <Input
              id="input-start-time"
              name="startTime"
              type="text"
              className="p-2 rounded-full bg-[#323232] w-full outline-none text-white placeholder:text-[#999]"
              placeholder="00:00:00"
              value={formState.startTime}
              onChange={onInputChange}
            ></Input>
          </InputGroup>

          <InputGroup className="flex flex-col w-full mt-2 px-2">
            <Label
              className="text-white text-xs font-semibold my-2"
              labelText="End Time"
            ></Label>
            <Input
              id="input-end-time"
              name="endTime"
              type="text"
              className="p-2 rounded-full bg-[#323232] w-full outline-none text-white placeholder:text-[#999]"
              placeholder="00:00:00"
              value={formState.endTime}
              onChange={onInputChange}
            ></Input>
          </InputGroup>
        </div>

        <InputGroup className="flex flex-col w-full mt-2 px-2">
          <Label
            className="text-white text-xs font-semibold my-2"
            labelText="Clip Title"
          ></Label>
          <Input
            id="input-clip-title"
            name="clipTitle"
            type="text"
            className="p-2 rounded-full bg-[#323232] w-full outline-none text-white placeholder:text-[#999]"
            placeholder="My Awesome Clip"
            value={formState.clipTitle}
            onChange={onInputChange}
          ></Input>
        </InputGroup>

        <InputGroup className="flex flex-col w-full mt-2 px-2">
          <Label
            className="text-white text-xs font-semibold my-2"
            labelText="YouTube Link"
          ></Label>
          <Input
            id="input-youtube-link"
            name="youtubeLink"
            type="text"
            className="p-2 rounded-full bg-[#323232] w-full outline-none text-white placeholder:text-[#999]"
            placeholder="https://youtube.com/watch?v=12345"
            value={formState.youtubeLink}
            onChange={onInputChange}
          ></Input>
        </InputGroup>

        <button
          type="submit"
          className="w-[calc(100%-1rem)] bg-white mt-6 mx-2 py-3 rounded-full cursor-pointer font-semibold"
        >
          Create Clip
        </button>
      </form>
    </MainLayout>
  );
};
