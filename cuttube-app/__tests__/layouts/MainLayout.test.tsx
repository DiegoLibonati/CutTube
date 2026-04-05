import { render, screen } from "@testing-library/react";

import type { MainLayoutProps } from "@/types/props";

import MainLayout from "@/layouts/MainLayout/MainLayout";

interface RenderLayout {
  container: HTMLElement;
  props: MainLayoutProps;
}

const renderLayout = (overrides?: Partial<MainLayoutProps>): RenderLayout => {
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
    renderLayout();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render children", () => {
    renderLayout();
    expect(screen.getByText("layout content")).toBeInTheDocument();
  });

  it("should apply the given className to the main element", () => {
    renderLayout({ className: "extra-class" });
    expect(screen.getByRole("main")).toHaveClass("extra-class");
  });
});
