import { useEffect, useState } from "react";

type UseScreenDetector = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const useScreenDetector = (): UseScreenDetector => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1024,
    isDesktop: width > 1024,
  };
};
