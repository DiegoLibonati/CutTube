import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Input } from "./Input";

type RenderComponent = {
  props: {
    id: string;
    type: React.HTMLInputTypeAttribute;
    className: string;
    placeholder: string;
    value: string;
    name: string;
    mockOnChange: jest.Mock;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    id: "username",
    type: "text",
    className: "class",
    placeholder: "placeholder",
    value: "",
    name: "username",
    mockOnChange: jest.fn(),
  };

  const { container } = render(
    <Input
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      className={props.className}
      onChange={props.mockOnChange}
    ></Input>
  );

  return {
    props: props,
    container: container,
  };
};

describe("Input.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the input.", () => {
      const { props } = renderComponent();

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", props.name);
      expect(input).toHaveAttribute("placeholder", props.placeholder);
      expect(input).toHaveAttribute("type", props.type);
      expect(input).toHaveValue(props.value);
      expect(input).toHaveClass(props.className);
    });

    test("It must execute the onChange function when you write something to the input.", async () => {
      const inputValue = "H";

      const { props } = renderComponent();

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputValue);

      expect(props.mockOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
