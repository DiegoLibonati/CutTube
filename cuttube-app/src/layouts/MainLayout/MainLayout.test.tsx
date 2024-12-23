import { screen, render } from "@testing-library/react";

import { MainLayout } from "./MainLayout";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<MainLayout></MainLayout>);

  return {
    container: container,
  };
};

test("It must render the main layout.", () => {
  renderComponent();

  const main = screen.getByRole("main")

  expect(main).toBeInTheDocument();
  expect(main).toHaveClass("w-full min-h-screen bg-[#161616]");
});
