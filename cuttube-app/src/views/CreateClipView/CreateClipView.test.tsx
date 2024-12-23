import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import MockAdapter from "axios-mock-adapter";

import { CreateClipView } from "./CreateClipView";

import { useUiStore } from "../../hooks/useUiStore";
import axios from "../../api/axios";

type RenderComponent = {
  container: HTMLElement;
};

const mockOnSetLoading = jest.fn();
const mockOnOpenModal = jest.fn();
const mockOnSetVideoDownloaded = jest.fn();

jest.mock("../../hooks/useUiStore.tsx", () => ({
  ...jest.requireActual("../../hooks/useUiStore.tsx"),
  useUiStore: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();

  (useUiStore as unknown as jest.Mock).mockReturnValue({
    onSetLoading: mockOnSetLoading,
    onOpenModal: mockOnOpenModal,
    onSetVideoDownloaded: mockOnSetVideoDownloaded,
  });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const mock = new MockAdapter(axios);

const renderComponent = (): RenderComponent => {
  const { container } = render(<CreateClipView></CreateClipView>);

  return {
    container: container,
  };
};

test("It must render the main.", () => {
  renderComponent();

  const main = screen.getByRole("main");

  expect(main).toBeInTheDocument();
});

test("It must render the view title", () => {
  renderComponent();

  const title = screen.getByRole("heading", { name: /CutTube/i });

  expect(title).toBeInTheDocument();
});

test("It must render the start and end time input, the name input, the youtube link input and the submit button.", () => {
  renderComponent();

  const inputStartTime = screen.getByRole("textbox", { name: /Start Time/i });
  const inputEndTime = screen.getByRole("textbox", { name: /End Time/i });
  const inputTitle = screen.getByRole("textbox", { name: /Clip Title/i });
  const inputYouTubeLink = screen.getByRole("textbox", {
    name: /YouTube Link/i,
  });
  const btnSubmit = screen.getByRole("button", {
    name: /create clip view submit/i,
  });

  expect(inputStartTime).toBeInTheDocument();
  expect(inputEndTime).toBeInTheDocument();
  expect(inputTitle).toBeInTheDocument();
  expect(inputYouTubeLink).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();
});

test("It should execute the relevant functions when the submit button is clicked without values.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  renderComponent();

  const inputStartTime = screen.getByRole("textbox", { name: /Start Time/i });
  const inputEndTime = screen.getByRole("textbox", { name: /End Time/i });
  const inputTitle = screen.getByRole("textbox", { name: /Clip Title/i });
  const inputYouTubeLink = screen.getByRole("textbox", {
    name: /YouTube Link/i,
  });
  const btnSubmit = screen.getByRole("button", {
    name: /create clip view submit/i,
  });

  expect(inputStartTime).toBeInTheDocument();
  expect(inputEndTime).toBeInTheDocument();
  expect(inputTitle).toBeInTheDocument();
  expect(inputYouTubeLink).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await userEvent.click(btnSubmit);

  expect(mockOnSetLoading).toHaveBeenCalledTimes(2);
  expect(mockOnSetLoading).toHaveBeenCalledWith(true);
  expect(mockOnSetLoading).toHaveBeenCalledWith(false);

  expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  expect(mockOnOpenModal).toHaveBeenCalledWith({
    buttonText: "Close",
    message: "You cannot have empty values",
    open: true,
    title: "Error",
  });
});

test("It should execute the relevant functions when the submit button is clicked with invalid time values.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  const startTime = "asd";
  const endTime = "asd";
  const title = "1234";
  const youtubeLink = "123456";

  renderComponent();

  const inputStartTime = screen.getByRole("textbox", { name: /Start Time/i });
  const inputEndTime = screen.getByRole("textbox", { name: /End Time/i });
  const inputTitle = screen.getByRole("textbox", { name: /Clip Title/i });
  const inputYouTubeLink = screen.getByRole("textbox", {
    name: /YouTube Link/i,
  });
  const btnSubmit = screen.getByRole("button", {
    name: /create clip view submit/i,
  });

  expect(inputStartTime).toBeInTheDocument();
  expect(inputEndTime).toBeInTheDocument();
  expect(inputTitle).toBeInTheDocument();
  expect(inputYouTubeLink).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputEndTime);
  await userEvent.click(inputEndTime);
  await userEvent.keyboard(endTime);

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputTitle);
  await userEvent.click(inputTitle);
  await userEvent.keyboard(title);

  await userEvent.clear(inputYouTubeLink);
  await userEvent.click(inputYouTubeLink);
  await userEvent.keyboard(youtubeLink);

  await userEvent.click(btnSubmit);

  expect(mockOnSetLoading).toHaveBeenCalledTimes(2);
  expect(mockOnSetLoading).toHaveBeenCalledWith(true);
  expect(mockOnSetLoading).toHaveBeenCalledWith(false);

  expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  expect(mockOnOpenModal).toHaveBeenCalledWith({
    buttonText: "Close",
    message:
      "The start of the clip and the end of the clip must have a valid format. Example: 00:10:00",
    open: true,
    title: "Error",
  });
});

test("It should execute the relevant functions when the submit button is clicked with invalid time values.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  const messageError = "error!";
  mock.onPost("/v1/cut/clip_video").reply(400, { message: messageError });

  const startTime = "00:10:00";
  const endTime = "00:20:00";
  const title = "1234";
  const youtubeLink = "123456";

  renderComponent();

  const inputStartTime = screen.getByRole("textbox", { name: /Start Time/i });
  const inputEndTime = screen.getByRole("textbox", { name: /End Time/i });
  const inputTitle = screen.getByRole("textbox", { name: /Clip Title/i });
  const inputYouTubeLink = screen.getByRole("textbox", {
    name: /YouTube Link/i,
  });
  const btnSubmit = screen.getByRole("button", {
    name: /create clip view submit/i,
  });

  expect(inputStartTime).toBeInTheDocument();
  expect(inputEndTime).toBeInTheDocument();
  expect(inputTitle).toBeInTheDocument();
  expect(inputYouTubeLink).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputEndTime);
  await userEvent.click(inputEndTime);
  await userEvent.keyboard(endTime);

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputTitle);
  await userEvent.click(inputTitle);
  await userEvent.keyboard(title);

  await userEvent.clear(inputYouTubeLink);
  await userEvent.click(inputYouTubeLink);
  await userEvent.keyboard(youtubeLink);

  await userEvent.click(btnSubmit);

  expect(mockOnSetLoading).toHaveBeenCalledTimes(2);
  expect(mockOnSetLoading).toHaveBeenCalledWith(true);
  expect(mockOnSetLoading).toHaveBeenCalledWith(false);

  expect(mockOnOpenModal).toHaveBeenCalledTimes(1);
  expect(mockOnOpenModal).toHaveBeenCalledWith({
    buttonText: "Close",
    message: messageError,
    open: true,
    title: "Error",
  });
});

test("It should execute the relevant functions when the submit button is clicked with invalid time values.", async () => {
  const userEvent = user.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  const fileName = "FileName";
  mock.onPost("/v1/cut/clip_video").reply(200, { filename: fileName });

  const startTime = "00:10:00";
  const endTime = "00:20:00";
  const title = "1234";
  const youtubeLink = "123456";

  renderComponent();

  const inputStartTime = screen.getByRole("textbox", { name: /Start Time/i });
  const inputEndTime = screen.getByRole("textbox", { name: /End Time/i });
  const inputTitle = screen.getByRole("textbox", { name: /Clip Title/i });
  const inputYouTubeLink = screen.getByRole("textbox", {
    name: /YouTube Link/i,
  });
  const btnSubmit = screen.getByRole("button", {
    name: /create clip view submit/i,
  });

  expect(inputStartTime).toBeInTheDocument();
  expect(inputEndTime).toBeInTheDocument();
  expect(inputTitle).toBeInTheDocument();
  expect(inputYouTubeLink).toBeInTheDocument();
  expect(btnSubmit).toBeInTheDocument();

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputEndTime);
  await userEvent.click(inputEndTime);
  await userEvent.keyboard(endTime);

  await userEvent.clear(inputStartTime);
  await userEvent.click(inputStartTime);
  await userEvent.keyboard(startTime);

  await userEvent.clear(inputTitle);
  await userEvent.click(inputTitle);
  await userEvent.keyboard(title);

  await userEvent.clear(inputYouTubeLink);
  await userEvent.click(inputYouTubeLink);
  await userEvent.keyboard(youtubeLink);

  await userEvent.click(btnSubmit);

  await jest.advanceTimersToNextTimerAsync(2000);

  expect(mockOnSetLoading).toHaveBeenCalledTimes(2);
  expect(mockOnSetLoading).toHaveBeenCalledWith(true);
  expect(mockOnSetLoading).toHaveBeenCalledWith(false);

  expect(mockOnSetVideoDownloaded).toHaveBeenCalledTimes(1);
  expect(mockOnSetVideoDownloaded).toHaveBeenCalledWith(true);
});
