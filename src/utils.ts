import { LocalStorageConfig, ScreenSize } from "./types";
import { RED_COLOR, ORANGE_COLOR, YELLOW_COLOR, GREEN_COLOR } from "./colors";

export const MOBILE_SCREEN_BREAKPOINT = 720;
export const LOCAL_STORAGE_KEY = "keywords-config";

export const formatNumber = (number: number): string =>
  new Intl.NumberFormat().format(number);

export const getBackgroundColor = (score: number): string => {
  if (score <= 10) return RED_COLOR;
  else if (score <= 40) return ORANGE_COLOR;
  else if (score <= 70) return YELLOW_COLOR;

  return GREEN_COLOR;
};

export const isSmallScreen = (screenSize: ScreenSize) => screenSize === "small";

export const INITIAL_LOCAL_STORAGE_STATE: LocalStorageConfig = {};
