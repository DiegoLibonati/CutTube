import { render } from "@testing-library/react";

import { NavBar } from "./NavBar";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<NavBar></NavBar>);

  return {
    container: container,
  };
};

test("It must render the header.", () => {
  const { container } = renderComponent();

  const header = container.querySelector("header") as HTMLElement;
  const headerChild = header?.firstChild as HTMLDivElement;

  expect(header).toBeInTheDocument();
  expect(header?.children).toHaveLength(1);
  expect(headerChild).toBeInTheDocument();
  expect(headerChild.children).toHaveLength(1);
});
