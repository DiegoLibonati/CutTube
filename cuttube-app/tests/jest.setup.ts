import "@testing-library/jest-dom";

import { mockConfig } from "@tests/jest.constants";

jest.mock("@src/constants/config.ts", () => ({
  get CONFIG() {
    return mockConfig;
  },
}));
