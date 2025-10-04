import { screen, render } from "@testing-library/react";

import { MainLayout } from "@src/layouts/MainLayout/MainLayout";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<MainLayout></MainLayout>);

  return {
    container: container,
  };
};

describe("MainLayout.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the main layout.", () => {
      renderComponent();

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("w-full min-h-screen bg-primary");
    });
  });
});
