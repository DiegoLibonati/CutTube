import "@testing-library/jest-dom";

import { mockConfig } from "./jest.constants";

jest.mock("../constants/config.ts", () => ({
  get CONFIG() {
    return mockConfig;
  },
}));
