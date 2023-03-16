import { RED_COLOR, YELLOW_COLOR, GREEN_COLOR, ORANGE_COLOR } from "./colors";
import {
  MOBILE_SCREEN_BREAKPOINT,
  formatNumber,
  getBackgroundColor,
} from "./utils";

describe("MOBILE_SCREEN_BREAKPOINT", () => {
  test("should be equal to 720", () => {
    expect(MOBILE_SCREEN_BREAKPOINT).toBe(720);
  });
});

describe("formatNumber", () => {
  test("should format number with commas", () => {
    expect(formatNumber(1000)).toBe("1,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
    expect(formatNumber(9999999)).toBe("9,999,999");
  });
});

describe("getBackgroundColor", () => {
  test("should return red for scores below 10", () => {
    expect(getBackgroundColor(5)).toBe(RED_COLOR);
    expect(getBackgroundColor(9)).toBe(RED_COLOR);
  });

  test("should return orange for scores between 10 and 40", () => {
    expect(getBackgroundColor(11)).toBe(ORANGE_COLOR);
    expect(getBackgroundColor(20)).toBe(ORANGE_COLOR);
    expect(getBackgroundColor(39)).toBe(ORANGE_COLOR);
  });

  test("should return yellow for scores between 40 and 70", () => {
    expect(getBackgroundColor(41)).toBe(YELLOW_COLOR);
    expect(getBackgroundColor(50)).toBe(YELLOW_COLOR);
    expect(getBackgroundColor(69)).toBe(YELLOW_COLOR);
  });

  test("should return green for scores above 70", () => {
    expect(getBackgroundColor(71)).toBe(GREEN_COLOR);
    expect(getBackgroundColor(80)).toBe(GREEN_COLOR);
    expect(getBackgroundColor(100)).toBe(GREEN_COLOR);
  });
});
