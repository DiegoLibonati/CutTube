import { render, screen } from "@testing-library/react";

import type { InputRootProps } from "@/types/props";

import InputRoot from "@/components/InputRoot/InputRoot";

interface RenderComponent {
  container: HTMLElement;
  props: InputRootProps;
}

const renderComponent = (overrides?: Partial<InputRootProps>): RenderComponent => {
  const props: InputRootProps = {
    children: <span>child content</span>,
    className: "test-class",
    ...overrides,
  };
  const { container } = render(<InputRoot {...props} />);
  return { container, props };
};

describe("InputRoot", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", () => {
    renderComponent();
    expect(screen.getByText("child content")).toBeInTheDocument();
  });

  it("should apply the given className", () => {
    const { container } = renderComponent({ className: "my-class" });
    expect(container.firstChild).toHaveClass("my-class");
  });
});
