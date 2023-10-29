import { STORAGE_KEYS } from "constants/storage";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

export const storeAccessToken = (accessToken: string) => {
  storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
};

export const getAccessToken: () => string = () => {
  return storage.getString(STORAGE_KEYS.ACCESS_TOKEN) || "";
};

export const clearAccessToken = () => {
  storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
};
