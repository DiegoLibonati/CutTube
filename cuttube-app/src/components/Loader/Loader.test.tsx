import { render } from "@testing-library/react";

import { Loader } from "@src/components/Loader/Loader";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loader></Loader>);

  return {
    container: container,
  };
};

describe("Loader.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the loader.", () => {
      const { container } = renderComponent();

      const loader = container.querySelector(".loader") as HTMLDivElement;

      expect(loader).toBeInTheDocument();
      expect(loader).toHaveClass("loader");
    });
  });
});
