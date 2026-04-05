import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Modal from "@/components/Modal/Modal";

import type { UseUiStore } from "@/types/hooks";

import { useUiStore } from "@/hooks/useUiStore";

interface RenderComponent {
  container: HTMLElement;
}

const mockOnResetModal = jest.fn();

jest.mock("@/hooks/useUiStore");

const renderComponent = (overrides?: Partial<UseUiStore>): RenderComponent => {
  (useUiStore as jest.Mock).mockReturnValue({
    modal: {
      title: "Error",
      message: "Something went wrong",
      buttonText: "Close",
      open: true,
    },
    loading: false,
    videoDownloaded: false,
    onResetModal: mockOnResetModal,
    onSetLoading: jest.fn(),
    onOpenModal: jest.fn(),
    onSetVideoDownloaded: jest.fn(),
    ...overrides,
  });
  const { container } = render(<Modal />);
  return { container };
};

describe("Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal title", () => {
    renderComponent();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });

  it("should render the modal message", () => {
    renderComponent();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should render the modal button text", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Close modal" })).toBeInTheDocument();
  });

  it("should have role dialog", () => {
    renderComponent();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should call onResetModal when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: "Close modal" }));
    expect(mockOnResetModal).toHaveBeenCalledTimes(1);
  });
});
