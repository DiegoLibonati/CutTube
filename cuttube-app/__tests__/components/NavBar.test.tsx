import { render, screen } from "@testing-library/react";

import NavBar from "@/components/NavBar/NavBar";

interface RenderComponent {
  container: HTMLElement;
}

const renderComponent = (): RenderComponent => {
  const { container } = render(<NavBar />);
  return { container };
};

describe("NavBar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a header element", () => {
    renderComponent();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the logo with role img", () => {
    renderComponent();
    expect(screen.getByRole("img", { name: "CutTube logo" })).toBeInTheDocument();
  });
});
