import { render, screen } from "@testing-library/react";

import LoadingView from "@/views/LoadingView/LoadingView";

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<LoadingView />);
  return { container };
};

describe("LoadingView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Loader", () => {
    renderComponent();
    expect(screen.getByRole("status", { name: "Processing video clip" })).toBeInTheDocument();
  });

  it("should render the processing message", () => {
    renderComponent();
    expect(
      screen.getByText("Your video clip is being processed. This may take a few moments")
    ).toBeInTheDocument();
  });
});
