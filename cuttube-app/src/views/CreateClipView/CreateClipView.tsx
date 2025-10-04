import { AxiosError } from "axios";

import { FormClip } from "@src/entities/forms";

import { Input } from "@src/components/Input/Input";
import { InputRoot } from "@src/components/InputRoot/InputRoot";
import { Label } from "@src/components/Label/Label";

import { MainLayout } from "@src/layouts/MainLayout/MainLayout";

import { clipVideo } from "@src/api/clipVideo";
import { removeClip } from "@src/api/removeClip";
import { useForm } from "@src/hooks/useForm";
import { useUiStore } from "@src/hooks/useUiStore";

export const CreateClipView = (): JSX.Element => {
  // Hooks
  const { formState, onInputChange, onResetForm } = useForm<FormClip>({
    start: "",
    end: "",
    filename: "",
    url: "",
  });
  const { onSetLoading, onOpenModal, onSetVideoDownloaded } = useUiStore();

  // Fns
  const handleCreateClip: React.FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    try {
      e.preventDefault();
      onSetLoading(true);

      const clipTitle = formState.filename.trim();
      const endTime = formState.end.trim();
      const startTime = formState.start.trim();
      const youtubeLink = formState.url.trim();

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

      const result = await clipVideo(formState);

      const data = result.data;
      const name = data.data.name as string;
      const filename = data.data.filename as string;

      const download = new Promise((resolve, reject) => {
        try {
          if (process.env.NODE_ENV === "test") return resolve(void 0);

          const a = document.createElement("a") as HTMLAnchorElement;

          a.href = `/api/v1/cut/${filename}/download`;
          a.download = name;

          document.body.appendChild(a);

          a.click();
          a.remove();

          resolve(void 0);
        } catch (e) {
          reject(e);
        }
      });

      download.then(() => {
        const timeout = setTimeout(async () => {
          await removeClip(filename);
          onSetLoading(false);
          onSetVideoDownloaded(true);
        }, 2000);

        return () => clearTimeout(timeout);
      });
    } catch (e: unknown) {
      let message = String(e) ?? "U";

      if (e instanceof AxiosError) {
        message = e?.response?.data?.message;
      }

      onSetLoading(false);
      onOpenModal({
        buttonText: "Close",
        message: message ?? "Error.",
        open: true,
        title: "Error",
      });
      onResetForm();
      return;
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
              name="start"
              type="text"
              className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
              placeholder="00:00:00"
              value={formState.start}
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
              name="end"
              type="text"
              className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
              placeholder="00:00:00"
              value={formState.end}
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
            name="filename"
            type="text"
            className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
            placeholder="My Awesome Clip"
            value={formState.filename}
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
            name="url"
            type="text"
            className="p-2 rounded-full bg-tinyBlack w-full outline-none text-white placeholder:text-gray-400"
            placeholder="https://youtube.com/watch?v=12345"
            value={formState.url}
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
