import { render, screen } from "@testing-library/react";

import SideNav from "@/components/SideNav/SideNav";

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<SideNav />);
  return { container };
};

describe("SideNav", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an aside element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLElement>("aside")).toBeInTheDocument();
  });

  it("should render the create clip button with the correct aria-label", () => {
    renderComponent();
    expect(
      screen.getByRole("button", { name: "Navigate to create a new clip" })
    ).toBeInTheDocument();
  });

  it("should render the Create clip text inside the button", () => {
    renderComponent();
    expect(screen.getByText("Create clip")).toBeInTheDocument();
  });
});
