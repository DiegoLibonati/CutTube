import "@testing-library/jest-dom";

import { mockConfig } from "./jest.constants";

jest.mock("../src/constants/config.ts", () => ({
  get CONFIG() {
    return mockConfig;
  },
}));
