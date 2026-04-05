import { render, screen } from "@testing-library/react";

import Loader from "@/components/Loader/Loader";

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader />);
  return { container };
};

describe("Loader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an element with role status", () => {
    renderComponent();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should have the correct aria-label", () => {
    renderComponent();
    expect(screen.getByLabelText("Processing video clip")).toBeInTheDocument();
  });
});
