import { FormClip } from "../entities/vite-env";
import axios from "./axios";

export const cutVideo = async (body: FormClip): Promise<string | unknown> => {
  try {
    const request = await axios.post(
      "/v1/cut/cut_video",
      JSON.stringify({
        url: body.youtubeLink,
        start: body.startTime,
        end: body.endTime,
        cut_name: body.clipTitle,
      })
    );

    const filename = request.data.filename;
    return filename;
  } catch (e) {
    return e;
  }
};
