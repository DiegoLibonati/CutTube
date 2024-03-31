import axios from "./axios";

export const removeClip = async (
  filename: string
): Promise<string | unknown> => {
  try {
    const request = await axios.delete(`/v1/cut/remove/${filename}`);

    const message = request.data.message;
    return message;
  } catch (e) {
    return e;
  }
};
