import { AxiosResponse } from "axios";

import axios from "@src/api/axios";

export const removeClip = async (filename: string): Promise<AxiosResponse> => {
  return await axios.delete(`/${filename}`);
};
