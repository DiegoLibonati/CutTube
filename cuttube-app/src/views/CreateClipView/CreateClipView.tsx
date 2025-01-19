import { FormClip } from "../../entities/vite-env";

import { Input } from "../../components/Input/Input";
import { InputRoot } from "../../components/InputRoot/InputRoot";
import { Label } from "../../components/Label/Label";

import { MainLayout } from "../../layouts/MainLayout/MainLayout";

import { clipVideo } from "../../api/clipVideo";
import { removeClip } from "../../api/removeClip";
import { useForm } from "../../hooks/useForm";
import { useUiStore } from "../../hooks/useUiStore";
import { AxiosError } from "axios";

export const CreateClipView = (): JSX.Element => {
  // Hooks
  const { formState, onInputChange, onResetForm } = useForm<FormClip>({
    startTime: "",
    endTime: "",
    clipTitle: "",
    youtubeLink: "",
  });
  const { onSetLoading, onOpenModal, onSetVideoDownloaded } = useUiStore();

  // Fns
  const handleCreateClip: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();
    onSetLoading(true);

    const clipTitle = formState.clipTitle.trim();
    const endTime = formState.endTime.trim();
    const startTime = formState.startTime.trim();
    const youtubeLink = formState.youtubeLink.trim();

    if (!clipTitle || !youtubeLink || !endTime || !startTime) {
      onSetLoading(false);
      onOpenModal({
        buttonText: "Close",
        message: "You cannot have empty values",
        open: true,
        title: "Error",
      });
      onResetForm();
      return;
    }

    const regexTime = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    if (!regexTime.test(endTime) || !regexTime.test(startTime)) {
      onSetLoading(false);
      onOpenModal({
        buttonText: "Close",
        message:
          "The start of the clip and the end of the clip must have a valid format. Example: 00:10:00",
        open: true,
        title: "Error",
      });
      onResetForm();
      return;
    }

    const data = await clipVideo(formState);

    if (data instanceof AxiosError) {
      onSetLoading(false);
      onOpenModal({
        buttonText: "Close",
        message: data.response!.data.message,
        open: true,
        title: "Error",
      });
      onResetForm();
      return;
    }

    if (typeof data === "string") {
      const download = new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === "test") return resolve(void 0);

        const a = document.createElement("a") as HTMLAnchorElement;

        a.href = `/v1/cut/download/${data}`;
        a.download = `${clipTitle}.mp4`;

        document.body.appendChild(a);

        a.click();
        a.remove();

        resolve(void 0);
      });

      download.then(() => {
        const timeout = setTimeout(async () => {
          await removeClip(data);
          onSetLoading(false);
          onSetVideoDownloaded(true);
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
        className={`flex flex-col items-start justify-center w-full p-2 md:w-[60%]`}
        onSubmit={handleCreateClip}
      >
        <div className={`flex flex-col w-full md:flex-row`}>
          <InputRoot className="flex flex-col w-full mt-2 px-2">
            <Label
              htmlFor="input-start-time"
              className="text-white text-xs font-semibold my-2"
              labelText="Start Time"
            ></Label>
            <Input
              id="input-start-time"
              name="startTime"
              type="text"
              className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
              placeholder="00:00:00"
              value={formState.startTime}
              onChange={onInputChange}
            ></Input>
          </InputRoot>

          <InputRoot className="flex flex-col w-full mt-2 px-2">
            <Label
              htmlFor="input-end-time"
              className="text-white text-xs font-semibold my-2"
              labelText="End Time"
            ></Label>
            <Input
              id="input-end-time"
              name="endTime"
              type="text"
              className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
              placeholder="00:00:00"
              value={formState.endTime}
              onChange={onInputChange}
            ></Input>
          </InputRoot>
        </div>

        <InputRoot className="flex flex-col w-full mt-2 px-2">
          <Label
            htmlFor="input-clip-title"
            className="text-white text-xs font-semibold my-2"
            labelText="Clip Title"
          ></Label>
          <Input
            id="input-clip-title"
            name="clipTitle"
            type="text"
            className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
            placeholder="My Awesome Clip"
            value={formState.clipTitle}
            onChange={onInputChange}
          ></Input>
        </InputRoot>

        <InputRoot className="flex flex-col w-full mt-2 px-2">
          <Label
            htmlFor="input-youtube-link"
            className="text-white text-xs font-semibold my-2"
            labelText="YouTube Link"
          ></Label>
          <Input
            id="input-youtube-link"
            name="youtubeLink"
            type="text"
            className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
            placeholder="https://youtube.com/watch?v=12345"
            value={formState.youtubeLink}
            onChange={onInputChange}
          ></Input>
        </InputRoot>

        <button
          type="submit"
          className="w-[calc(100%-1rem)] bg-white mt-6 mx-2 py-3 rounded-full cursor-pointer font-semibold"
          aria-label="create clip view submit"
        >
          Create Clip
        </button>
      </form>
    </MainLayout>
  );
};
