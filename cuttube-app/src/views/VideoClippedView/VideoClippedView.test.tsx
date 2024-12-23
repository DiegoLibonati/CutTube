import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { VideoClippedView } from "./VideoClippedView";

import { useUiStore } from "../../hooks/useUiStore";

type RenderComponent = {
  container: HTMLElement;
};

const mockOnSetVideoDownloaded = jest.fn();

jest.mock("../../hooks/useUiStore.tsx", () => ({
  ...jest.requireActual("../../hooks/useUiStore.tsx"),
  useUiStore: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();

  (useUiStore as unknown as jest.Mock).mockReturnValue({
    onSetVideoDownloaded: mockOnSetVideoDownloaded,
  });
});

const renderComponent = (): RenderComponent => {
  const { container } = render(<VideoClippedView></VideoClippedView>);

  return {
    container: container,
  };
};

test("It must render the main.", () => {
  renderComponent();

  const main = screen.getByRole("main");

  expect(main).toBeInTheDocument();
});

test("It must render the title and description of the view.", () => {
  renderComponent();

  const title = screen.getByRole("heading", {
    name: /Congratulations on creating your clip!/i,
  });
  const description = screen.getByText(
    "Your clip is being processed and will be ready shortly."
  );

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test("It should render the 'Go Back' button and also execute the relevant functions when it is clicked.", async () => {
  renderComponent();

  const btnGoBack = screen.getByRole("button", { name: /go back/i });

  expect(btnGoBack).toBeInTheDocument();

  await user.click(btnGoBack);

  expect(mockOnSetVideoDownloaded).toHaveBeenCalledTimes(1);
  expect(mockOnSetVideoDownloaded).toHaveBeenCalledWith(false);
});
