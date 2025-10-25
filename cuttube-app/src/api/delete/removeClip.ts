import { RemoveClipResponse } from "@src/entities/responses";

import { cutTubeApi } from "@src/api/cutTube";

export const removeClip = async (
  filename: string
): Promise<RemoveClipResponse> => {
  try {
    const response = await cutTubeApi.delete(`/${filename}`);

    const data: RemoveClipResponse = await response.data;

    return data;
  } catch (e) {
    console.log("Error remove clip: ", e);
    throw Error(`Error remove clip: ${e}`);
  }
};
