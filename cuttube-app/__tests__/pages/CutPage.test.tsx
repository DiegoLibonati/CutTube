import { render, screen } from "@testing-library/react";

import CutPage from "@/pages/CutPage/CutPage";

import type { UseUiStore } from "@/types/hooks";
import type { UseScreenDetector } from "@/types/hooks";

import { useUiStore } from "@/hooks/useUiStore";
import { useScreenDetector } from "@/hooks/useScreenDetector";

interface RenderPage {
  container: HTMLElement;
}

const mockOnSetLoading = jest.fn();
const mockOnOpenModal = jest.fn();
const mockOnResetModal = jest.fn();
const mockOnSetVideoDownloaded = jest.fn();

jest.mock("@/hooks/useUiStore");
jest.mock("@/hooks/useScreenDetector");

const renderPage = (
  uiOverrides?: Partial<UseUiStore>,
  screenOverrides?: Partial<UseScreenDetector>
): RenderPage => {
  (useUiStore as jest.Mock).mockReturnValue({
    modal: { title: "", message: "", buttonText: "", open: false },
    loading: false,
    videoDownloaded: false,
    onSetLoading: mockOnSetLoading,
    onOpenModal: mockOnOpenModal,
    onResetModal: mockOnResetModal,
    onSetVideoDownloaded: mockOnSetVideoDownloaded,
    ...uiOverrides,
  });
  (useScreenDetector as jest.Mock).mockReturnValue({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    ...screenOverrides,
  });
  const { container } = render(<CutPage />);
  return { container };
};

describe("CutPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render SideNav on desktop", () => {
    renderPage(undefined, { isMobile: false, isTablet: false, isDesktop: true });
    expect(
      screen.getByRole("button", { name: "Navigate to create a new clip" })
    ).toBeInTheDocument();
  });

  it("should render SideNav on tablet", () => {
    renderPage(undefined, { isMobile: false, isTablet: true, isDesktop: false });
    expect(
      screen.getByRole("button", { name: "Navigate to create a new clip" })
    ).toBeInTheDocument();
  });

  it("should render NavBar on mobile", () => {
    renderPage(undefined, { isMobile: true, isTablet: false, isDesktop: false });
    expect(screen.getByRole("img", { name: "CutTube logo" })).toBeInTheDocument();
  });

  it("should render CreateClipView by default", () => {
    renderPage();
    expect(screen.getByText("CutTube")).toBeInTheDocument();
  });

  it("should render LoadingView when loading is true", () => {
    renderPage({ loading: true });
    expect(screen.getByRole("status", { name: "Processing video clip" })).toBeInTheDocument();
  });

  it("should render VideoClippedView when videoDownloaded is true", () => {
    renderPage({ videoDownloaded: true });
    expect(screen.getByText("Congratulations on creating your clip!")).toBeInTheDocument();
  });

  it("should render Modal when modal is open", () => {
    renderPage({
      modal: { title: "Error", message: "Oops", buttonText: "Close", open: true },
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
