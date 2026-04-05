import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VideoClippedView from "@/views/VideoClippedView/VideoClippedView";

import { UseUiStore } from "@/types/hooks";

import { useUiStore } from "@/hooks/useUiStore";

type RenderComponent = { container: HTMLElement };

const mockOnSetVideoDownloaded = jest.fn();

jest.mock("@/hooks/useUiStore");

const renderComponent = (overrides?: Partial<UseUiStore>): RenderComponent => {
  (useUiStore as jest.Mock).mockReturnValue({
    modal: { title: "", message: "", buttonText: "", open: false },
    loading: false,
    videoDownloaded: true,
    onSetLoading: jest.fn(),
    onOpenModal: jest.fn(),
    onResetModal: jest.fn(),
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
    renderComponent();
    expect(screen.getByText("Congratulations on creating your clip!")).toBeInTheDocument();
  });

  it("should render the success message", () => {
    renderComponent();
    expect(
      screen.getByText("Your clip is being processed and will be ready shortly.")
    ).toBeInTheDocument();
  });

  it("should render the go back button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Go back to clip creation" })).toBeInTheDocument();
  });

  it("should call onSetVideoDownloaded(false) when the go back button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: "Go back to clip creation" }));
    expect(mockOnSetVideoDownloaded).toHaveBeenCalledWith(false);
  });
});
