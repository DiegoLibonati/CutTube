import "@testing-library/jest-dom";

jest.mock("@src/constants/envs", () => {
  const { mockEnvs } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockEnvs };
});
