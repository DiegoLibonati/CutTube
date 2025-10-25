import { FormClip } from "@src/entities/forms";
import { ClipVideoResponse } from "@src/entities/responses";

import { cutTubeApi } from "@src/api/cutTube";

export const clipVideo = async (form: FormClip): Promise<ClipVideoResponse> => {
  try {
    const response = await cutTubeApi.post(
      `/${form.filename}/clip`,
      JSON.stringify({
        url: form.url,
        start: form.start,
        end: form.end,
      })
    );

    const data: ClipVideoResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error clip video: ", e);
    throw Error(`Error clip video: ${e}`);
  }
};
