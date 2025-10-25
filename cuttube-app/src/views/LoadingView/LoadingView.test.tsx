import { screen, render } from "@testing-library/react";

import { LoadingView } from "@src/views/LoadingView/LoadingView";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<LoadingView></LoadingView>);

  return {
    container: container,
  };
};

describe("LoadingView.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the main.", () => {
      renderComponent();

      const main = screen.getByRole("main");

      expect(main).toBeInTheDocument();
    });

    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const loader = container.querySelector<HTMLDivElement>(".loader");

      expect(loader).toBeInTheDocument();
      expect(loader).toHaveClass("loader");
    });

    test("It must render the informational text.", () => {
      renderComponent();

      const heading = screen.getByRole("heading", {
        name: /Your video clip is being processed. This may take a few moments/i,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
