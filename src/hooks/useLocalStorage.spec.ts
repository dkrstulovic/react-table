import { LocalStorageConfig } from "./../types";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  const key = "test";
  const value: LocalStorageConfig = { selectedColumn: "competitions" };

  beforeEach(() => {
    localStorage.clear();
  });

  it("should set and get a value from local storage", () => {
    const { setLocalValue, getLocalValue } = useLocalStorage();
    setLocalValue(key, value);
    expect(getLocalValue(key)).toEqual(value);
  });
});
