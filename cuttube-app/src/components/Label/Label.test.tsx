import { screen, render } from "@testing-library/react";

import { Label } from "./Label";

type RenderComponent = {
  props: {
    labelText: string;
    className: string;
    htmlFor: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    labelText: "1234",
    className: "class",
    htmlFor: "12345",
  };

  const { container } = render(
    <Label
      labelText={props.labelText}
      htmlFor={props.htmlFor}
      className={props.className}
    ></Label>
  );

  return {
    props: props,
    container: container,
  };
};

test("It must render the label.", () => {
  const { props } = renderComponent();

  const label = screen.getByText(props.labelText);

  expect(label).toBeInTheDocument();
  expect(label).toHaveAttribute("for", props.htmlFor);
  expect(label).toHaveClass(props.className);
});
