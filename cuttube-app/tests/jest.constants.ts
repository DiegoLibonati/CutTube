import { Modal } from "@src/entities/app";
import { Envs } from "@src/entities/envs";

export const getMockModal = (modal: Modal): Modal => {
  return modal;
};

export const mockEnvs: Envs = {
  apiUrl: "YOUR API URL [OPTIONAL]",
};
