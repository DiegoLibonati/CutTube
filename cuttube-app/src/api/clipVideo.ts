import { AxiosResponse } from "axios";
import axios from "@src/api/axios";

import { FormClip } from "@src/entities/forms";

export const clipVideo = async (form: FormClip): Promise<AxiosResponse> => {
  return await axios.post(
    `/${form.filename}/clip`,
    JSON.stringify({
      url: form.url,
      start: form.start,
      end: form.end,
    })
  );
};
