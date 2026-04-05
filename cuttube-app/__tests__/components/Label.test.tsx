import { render, screen } from "@testing-library/react";

import { LabelProps } from "@/types/props";

import Label from "@/components/Label/Label";

type RenderComponent = { container: HTMLElement; props: LabelProps };

const renderComponent = (overrides?: Partial<LabelProps>): RenderComponent => {
  const props: LabelProps = {
    labelText: "Test Label",
    htmlFor: "test-input",
    className: "label-class",
    ...overrides,
  };
  const { container } = render(<Label {...props} />);
  return { container, props };
};

describe("Label", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the label text", () => {
    renderComponent({ labelText: "My Label" });
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("should have the correct htmlFor attribute", () => {
    const { container } = renderComponent({ htmlFor: "my-input" });
    expect(container.querySelector<HTMLLabelElement>("label")?.htmlFor).toBe("my-input");
  });

  it("should apply the given className", () => {
    const { container } = renderComponent({ className: "custom-class" });
    expect(container.querySelector<HTMLLabelElement>("label")).toHaveClass("custom-class");
  });
});
