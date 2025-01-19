import { screen, render } from "@testing-library/react";

import { InputRoot } from "./InputRoot";

type RenderComponent = {
  props: {
    className: string;
  };
  valueText: string;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const valueText = "1234";

  const props = {
    className: "class",
  };

  const { container } = render(
    <InputRoot className={props.className}>
      <p>{valueText}</p>
    </InputRoot>
  );

  return {
    props: props,
    valueText: valueText,
    container: container,
  };
};

describe("InputRoot.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root input next to the child component.", () => {
      const { props, valueText } = renderComponent();

      const text = screen.getByText(valueText);
      const inputRoot = text.parentElement;

      expect(text).toBeInTheDocument();
      expect(inputRoot).toBeInTheDocument();
      expect(inputRoot).toHaveClass(props.className);
    });
  });
});
