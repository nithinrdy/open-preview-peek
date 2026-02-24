import type {
  StorageKeys,
  ChromeStorageValue,
} from "@src/types/chrome-storage";

const saveToChromeStorage = async (
  key: StorageKeys,
  value: ChromeStorageValue,
) => {
  try {
    await chrome.storage.local.set({ [key]: value });
    console.log(`Saved ${key} to Chrome storage.`);
  } catch (error) {
    console.error(`Error saving ${key} to Chrome storage:`, error);
  }
};

const getFromChromeStorage = async <T>(key: StorageKeys): Promise<T | null> => {
  try {
    const result = await chrome.storage.local.get(key);
    return result[key];
  } catch (error) {
    console.error(`Error retrieving ${key} from Chrome storage:`, error);
    return null;
  }
};

export { saveToChromeStorage, getFromChromeStorage };
