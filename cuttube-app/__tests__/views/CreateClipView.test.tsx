import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateClipView from "@/views/CreateClipView/CreateClipView";

import { UseUiStore } from "@/types/hooks";

import { useUiStore } from "@/hooks/useUiStore";

import cutTubeService from "@/services/cutTubeService";

type RenderComponent = { container: HTMLElement };

const mockOnSetLoading = jest.fn();
const mockOnOpenModal = jest.fn();
const mockOnSetVideoDownloaded = jest.fn();
const mockAnchorElementClick = jest.fn();

jest.mock("@/hooks/useUiStore");
jest.mock("@/services/cutTubeService");

const renderComponent = (overrides?: Partial<UseUiStore>): RenderComponent => {
  (useUiStore as jest.Mock).mockReturnValue({
    modal: { title: "", message: "", buttonText: "", open: false },
    loading: false,
    videoDownloaded: false,
    onSetLoading: mockOnSetLoading,
    onOpenModal: mockOnOpenModal,
    onResetModal: jest.fn(),
    onSetVideoDownloaded: mockOnSetVideoDownloaded,
    ...overrides,
  });
  const { container } = render(<CreateClipView />);
  return { container };
};

describe("CreateClipView", () => {
  beforeAll(() => {
    window.HTMLAnchorElement.prototype.click = mockAnchorElementClick;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page heading", () => {
    renderComponent();
    expect(screen.getByRole("heading", { name: "CutTube" })).toBeInTheDocument();
  });

  it("should render all form fields", () => {
    renderComponent();
    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Clip Title")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube Link")).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: "Submit clip creation" })).toBeInTheDocument();
  });

  it("should render a form with the correct aria-label", () => {
    renderComponent();
    expect(screen.getByRole("form", { name: "Clip creation form" })).toBeInTheDocument();
  });

  it("should show an error modal when submitting with empty fields", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.click(screen.getByRole("button", { name: "Submit clip creation" }));
    expect(mockOnOpenModal).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Error", open: true })
    );
  });

  it("should show an error modal when time format is invalid", async () => {
    const user = userEvent.setup();
    renderComponent();
    await user.type(screen.getByLabelText("Start Time"), "bad-time");
    await user.type(screen.getByLabelText("End Time"), "bad-time");
    await user.type(screen.getByLabelText("Clip Title"), "my-clip");
    await user.type(screen.getByLabelText("YouTube Link"), "https://www.youtube.com/watch?v=test");
    await user.click(screen.getByRole("button", { name: "Submit clip creation" }));
    expect(mockOnOpenModal).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Error", open: true })
    );
  });

  it("should call clipVideo with the correct data on valid submit", async () => {
    const user = userEvent.setup();
    (cutTubeService.clipVideo as jest.Mock).mockResolvedValue({
      code: "SUCCESS",
      message: "ok",
      data: { name: "my-clip.mp4", filename: "my-clip" },
    });
    renderComponent();
    await user.type(screen.getByLabelText("Start Time"), "00:00:10");
    await user.type(screen.getByLabelText("End Time"), "00:00:20");
    await user.type(screen.getByLabelText("Clip Title"), "my-clip");
    await user.type(screen.getByLabelText("YouTube Link"), "https://www.youtube.com/watch?v=test");
    await user.click(screen.getByRole("button", { name: "Submit clip creation" }));
    await waitFor(() => {
      expect(cutTubeService.clipVideo).toHaveBeenCalledWith(
        expect.objectContaining({
          start: "00:00:10",
          end: "00:00:20",
          filename: "my-clip",
          url: "https://www.youtube.com/watch?v=test",
        })
      );
    });
  });
});
