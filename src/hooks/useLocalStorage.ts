import { LocalStorageConfig } from "../types";

export const useLocalStorage = () => {
  const setValue = (key: string, value: LocalStorageConfig): void =>
    localStorage.setItem(key, JSON.stringify(value));

  const getValue = (key: string): LocalStorageConfig | undefined => {
    const stringifiedValues = localStorage.getItem(key);
    return stringifiedValues ? JSON.parse(stringifiedValues) : undefined;
  };

  return { getLocalValue: getValue, setLocalValue: setValue };
};
