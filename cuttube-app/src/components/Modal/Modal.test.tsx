import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Provider } from "react-redux";

import { Modal } from "./Modal";

import { useUiStore } from "../../hooks/useUiStore";
import { store } from "../../store/store";

import { getMockModal } from "../../../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <Modal></Modal>
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../../hooks/useUiStore.tsx", () => ({
  ...jest.requireActual("../../hooks/useUiStore.tsx"),
  useUiStore: jest.fn(),
}));

describe("Modal.tsx", () => {
  describe("If the modal has content.", () => {
    const mockOnResetModal = jest.fn();

    const mockModal = getMockModal({
      open: true,
      buttonText: "123",
      message: "1234",
      title: "12345",
    });

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        onResetModal: mockOnResetModal,
      });
    });

    test("It must render the modal with elements that have content.", () => {
      renderComponent();

      const title = screen.getByRole("heading", { name: mockModal.title });
      const message = screen.getByText(mockModal.message);
      const btn = screen.getByRole("button", { name: "button modal" });

      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(btn).toBeInTheDocument();
    });

    test("It should execute the relevant functions when the button is clicked.", async () => {
      renderComponent();

      const btn = screen.getByRole("button", { name: "button modal" });

      expect(btn).toBeInTheDocument();

      await user.click(btn);

      expect(mockOnResetModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("If the modal has NOT content.", () => {
    const mockOnResetModal = jest.fn();

    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        onResetModal: mockOnResetModal,
      });
    });

    test("It should render the modal completely empty.", () => {
      renderComponent();

      const headings = screen.getAllByRole("heading");
      const paragraphs = screen.getAllByRole("paragraph");
      const btn = screen.getByRole("button", { name: /button modal/i });

      for (const heading of headings) {
        expect(heading).toBeInTheDocument();
        expect(heading).toBeEmptyDOMElement();
      }

      for (const paragraph of paragraphs) {
        expect(paragraph).toBeInTheDocument();
        expect(paragraph).toBeEmptyDOMElement();
      }

      expect(btn).toBeInTheDocument();
      expect(btn).toBeEmptyDOMElement();
    });
  });
});
