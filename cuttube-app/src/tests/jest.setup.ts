import "@testing-library/jest-dom";

import { Config, Modal } from "../entities/vite-env";

const MOCK_CONFIG: Config = {
  apiUrl: "YOUR API URL [OPTIONAL]",
};

jest.mock("../constants/config.ts", () => ({
  get CONFIG() {
    return MOCK_CONFIG;
  },
}));

export const getMockModal = (modal: Modal): Modal => {
  return modal;
};
