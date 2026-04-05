import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

import { mockEnvs } from "@tests/__mocks__/envs.mock";

const mockFetch = jest.fn();

Object.assign(globalThis, { TextEncoder, TextDecoder });

globalThis.fetch = mockFetch;

jest.mock("@/constants/envs", () => {
  return { __esModule: true, default: mockEnvs };
});
