import { render, screen } from "@testing-library/react";

import { MainLayoutProps } from "@/types/props";

import MainLayout from "@/layouts/MainLayout/MainLayout";

type RenderComponent = { container: HTMLElement; props: MainLayoutProps };

const renderComponent = (overrides?: Partial<MainLayoutProps>): RenderComponent => {
  const props: MainLayoutProps = {
    children: <p>layout content</p>,
    className: "",
    ...overrides,
  };
  const { container } = render(<MainLayout {...props} />);
  return { container, props };
};

describe("MainLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a main element", () => {
    renderComponent();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render children", () => {
    renderComponent();
    expect(screen.getByText("layout content")).toBeInTheDocument();
  });

  it("should apply the given className to the main element", () => {
    renderComponent({ className: "extra-class" });
    expect(screen.getByRole("main")).toHaveClass("extra-class");
  });
});
