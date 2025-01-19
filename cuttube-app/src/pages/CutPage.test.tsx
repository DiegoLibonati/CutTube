import { screen, render } from "@testing-library/react";

import { Provider } from "react-redux";

import { CutPage } from "./CutPage";

import { useUiStore } from "../hooks/useUiStore";
import { useScreenDetector } from "../hooks/useScreenDetector";
import { store } from "../store/store";

import { getMockModal } from "../tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(
    <Provider store={store}>
      <CutPage></CutPage>
    </Provider>
  );

  return {
    container: container,
  };
};

jest.mock("../hooks/useUiStore.tsx", () => ({
  ...jest.requireActual("../hooks/useUiStore.tsx"),
  useUiStore: jest.fn(),
}));
jest.mock("../hooks/useScreenDetector.tsx", () => ({
  ...jest.requireActual("../hooks/useScreenDetector.tsx"),
  useScreenDetector: jest.fn(),
}));

describe("CutPage.tsx", () => {
  describe("If 'isTablet' or 'isDesktop' is true.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = false;
    const videoDownloaded = false;

    const isTablet = true;
    const isDesktop = true;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It should render the SideNav and not the NavBar.", () => {
      const { container } = renderComponent();

      const sideNav = container.querySelector("aside");
      const navBar = container.querySelector("header");

      expect(sideNav).toBeInTheDocument();
      expect(navBar).not.toBeInTheDocument();
    });
  });

  describe("If 'isTablet' or 'isDesktop' is false.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = false;
    const videoDownloaded = false;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It should render the NavBar and not the SideNav.", () => {
      const { container } = renderComponent();

      const sideNav = container.querySelector("aside");
      const navBar = container.querySelector("header");

      expect(sideNav).not.toBeInTheDocument();
      expect(navBar).toBeInTheDocument();
    });
  });

  describe("If 'loading' is true.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = true;
    const videoDownloaded = false;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It must render the loading view.", () => {
      renderComponent();

      const headingLoading = screen.getByRole("heading", {
        name: /Your video clip is being processed. This may take a few moments/i,
      });
      const headingClipped = screen.queryByRole("heading", {
        name: /Congratulations on creating your clip!/i,
      });
      const buttonCreateClip = screen.queryByRole("button", {
        name: /create clip view submit/i,
      });

      expect(headingLoading).toBeInTheDocument();
      expect(headingClipped).not.toBeInTheDocument();
      expect(buttonCreateClip).not.toBeInTheDocument();
    });
  });

  describe("If 'videoDownloaded' is true and 'loading' is false.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = false;
    const videoDownloaded = true;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It must render the clipped view.", () => {
      renderComponent();

      const headingLoading = screen.queryByRole("heading", {
        name: /Your video clip is being processed. This may take a few moments/i,
      });
      const headingClipped = screen.getByRole("heading", {
        name: /Congratulations on creating your clip!/i,
      });
      const buttonCreateClip = screen.queryByRole("button", {
        name: /create clip view submit/i,
      });

      expect(headingLoading).not.toBeInTheDocument();
      expect(headingClipped).toBeInTheDocument();
      expect(buttonCreateClip).not.toBeInTheDocument();
    });
  });

  describe("If 'videoDownloaded' is false and 'loading' is false.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = false;
    const videoDownloaded = false;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It must render the create clip view.", () => {
      renderComponent();

      const headingLoading = screen.queryByRole("heading", {
        name: /Your video clip is being processed. This may take a few moments/i,
      });
      const headingClipped = screen.queryByRole("heading", {
        name: /Congratulations on creating your clip!/i,
      });
      const buttonCreateClip = screen.getByRole("button", {
        name: /create clip view submit/i,
      });

      expect(headingLoading).not.toBeInTheDocument();
      expect(headingClipped).not.toBeInTheDocument();
      expect(buttonCreateClip).toBeInTheDocument();
    });
  });

  describe("If 'modal.open' is false.", () => {
    const mockModal = getMockModal({
      open: false,
      buttonText: "",
      message: "",
      title: "",
    });
    const loading = false;
    const videoDownloaded = false;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It should not render the modal.", () => {
      renderComponent();

      const btnModal = screen.queryByRole("button", { name: /button modal/i });

      expect(btnModal).not.toBeInTheDocument();
    });
  });

  describe("If 'modal.open' is true.", () => {
    const mockModal = getMockModal({
      open: true,
      buttonText: "1234",
      message: "123",
      title: "12",
    });
    const loading = false;
    const videoDownloaded = false;

    const isTablet = false;
    const isDesktop = false;

    beforeEach(() => {
      jest.resetAllMocks();

      (useUiStore as unknown as jest.Mock).mockReturnValue({
        modal: mockModal,
        loading: loading,
        videoDownloaded: videoDownloaded,
      });
      (useScreenDetector as unknown as jest.Mock).mockReturnValue({
        isTablet: isTablet,
        isDesktop: isDesktop,
      });
    });

    test("It should render the modal.", () => {
      renderComponent();

      const title = screen.getByRole("heading", { name: mockModal.title });
      const message = screen.getByText(mockModal.message);
      const btnModal = screen.queryByRole("button", { name: /button modal/i });

      expect(title).toBeInTheDocument();
      expect(message).toBeInTheDocument();
      expect(btnModal).toBeInTheDocument();
      expect(btnModal).toHaveTextContent(mockModal.buttonText);
    });
  });
});
