import { STORAGE_KEYS } from "constants/storage";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

//auth access token

export const clearStorage = () => {
  storage.clearAll();
};

export const storeAccessToken = (accessToken: string) => {
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

export const getAccessToken: () => string = () => {
  return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) || "";
};

export const clearAccessToken = () => {
  storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
};

//initial preferences

export const getInitialPreferencesDone: () => boolean | undefined = () => {
  return storage.getBoolean(STORAGE_KEYS.INITIAL_PREFERENCES);
};

export const setInitialPreferencesDone = () => {
  storage.set(STORAGE_KEYS.INITIAL_PREFERENCES, true);
};
