import { screen, render, within } from "@testing-library/react";

import { SideNav } from "@src/components/SideNav/SideNav";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<SideNav></SideNav>);

  return {
    container: container,
  };
};

describe("SideNav.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the sideNav with the relevant options.", () => {
      const { container } = renderComponent();

      const aside = container.querySelector<HTMLElement>("aside");
      const btnCreateClip = screen.getByRole("button", {
        name: /create clip/i,
      });
      const btnText = within(btnCreateClip).getByText("Create clip");

      expect(aside).toBeInTheDocument();
      expect(btnCreateClip).toBeInTheDocument();
      expect(btnCreateClip.children).toHaveLength(2);
      expect(btnText).toBeInTheDocument();
    });
  });
});
