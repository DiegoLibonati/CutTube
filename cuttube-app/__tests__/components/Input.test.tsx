import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { InputProps } from "@/types/props";

import Input from "@/components/Input/Input";

interface RenderComponent {
  container: HTMLElement;
  props: InputProps;
}

const mockOnChange = jest.fn();

const renderComponent = (overrides?: Partial<InputProps>): RenderComponent => {
  const props: InputProps = {
    id: "test-input",
    type: "text",
    placeholder: "Enter value",
    value: "",
    name: "test-name",
    onChange: mockOnChange,
    ...overrides,
  };
  const { container } = render(<Input {...props} />);
  return { container, props };
};

describe("Input", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input element", () => {
    const { container } = renderComponent();
    expect(container.querySelector<HTMLInputElement>("input")).toBeInTheDocument();
  });

  it("should render with the given placeholder", () => {
    renderComponent({ placeholder: "Type here" });
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("should render with the given value", () => {
    renderComponent({ value: "hello" });
    expect(screen.getByDisplayValue("hello")).toBeInTheDocument();
  });

  it("should render with the given id", () => {
    const { container } = renderComponent({ id: "my-input" });
    expect(container.querySelector<HTMLInputElement>("#my-input")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();
    const input = container.querySelector<HTMLInputElement>("input")!;
    await user.type(input, "a");
    expect(mockOnChange).toHaveBeenCalled();
  });
});
