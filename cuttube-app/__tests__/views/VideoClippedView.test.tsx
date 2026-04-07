import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VideoClippedView from "@/views/VideoClippedView/VideoClippedView";

import type { UseUiStore } from "@/types/hooks";

import { useUiStore } from "@/hooks/useUiStore";

interface RenderView {
  container: HTMLElement;
}

const mockOnSetVideoDownloaded = jest.fn();
const mockOnSetLoading = jest.fn();
const mockOnOpenModal = jest.fn();
const mockOnResetModal = jest.fn();

jest.mock("@/hooks/useUiStore");

const renderView = (overrides?: Partial<UseUiStore>): RenderView => {
  (useUiStore as jest.Mock).mockReturnValue({
    modal: { title: "", message: "", buttonText: "", open: false },
    loading: false,
    videoDownloaded: true,
    onSetLoading: mockOnSetLoading,
    onOpenModal: mockOnOpenModal,
    onResetModal: mockOnResetModal,
    onSetVideoDownloaded: mockOnSetVideoDownloaded,
    ...overrides,
  });
  const { container } = render(<VideoClippedView />);
  return { container };
};

describe("VideoClippedView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the success heading", () => {
    renderView();
    expect(screen.getByText("Congratulations on creating your clip!")).toBeInTheDocument();
  });

  it("should render the success message", () => {
    renderView();
    expect(
      screen.getByText("Your clip is being processed and will be ready shortly.")
    ).toBeInTheDocument();
  });

  it("should render the go back button", () => {
    renderView();
    expect(screen.getByRole("button", { name: "Go back to clip creation" })).toBeInTheDocument();
  });

  it("should call onSetVideoDownloaded(false) when the go back button is clicked", async () => {
    const user = userEvent.setup();
    renderView();
    await user.click(screen.getByRole("button", { name: "Go back to clip creation" }));
    expect(mockOnSetVideoDownloaded).toHaveBeenCalledWith(false);
  });
});
