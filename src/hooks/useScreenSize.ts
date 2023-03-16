import { useState, useEffect } from "react";

import { ScreenSize } from "../types";
import { MOBILE_SCREEN_BREAKPOINT } from "../utils";

const getScreenSize = (): ScreenSize => {
  return window.innerWidth < MOBILE_SCREEN_BREAKPOINT ? "small" : "large";
};

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};
