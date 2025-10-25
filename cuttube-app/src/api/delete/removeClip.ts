import { cutTubeApi } from "@src/api/cutTube";

export const removeClip = async (filename: string): Promise<void> => {
  try {
    await cutTubeApi.delete(`/${filename}`);

    return;
  } catch (e) {
    console.log("Error remove clip: ", e);
    throw Error(`Error remove clip: ${e}`);
  }
};
