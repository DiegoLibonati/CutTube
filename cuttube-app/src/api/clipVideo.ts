import axios from "./axios";

import { FormClip } from "../entities/vite-env";

export const clipVideo = async (form: FormClip): Promise<string | unknown> => {
  try {
    const request = await axios.post(
      "/v1/cut/clip_video",
      JSON.stringify({
        url: form.youtubeLink,
        start: form.startTime,
        end: form.endTime,
        cut_name: form.clipTitle,
      })
    );

    const filename = request.data.filename;
    return filename;
  } catch (e: unknown) {
    return e;
  }
};
