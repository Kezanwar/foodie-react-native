import { STORAGE_KEYS } from "constants/storage";
import { MMKV } from "react-native-mmkv";

const mmkv = new MMKV();

class LocalStorage {
  //default
  clearStorage() {
    mmkv.clearAll();
  }

  //access token
  storeAccessToken(accessToken: string) {
    mmkv.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }
  getAccessToken() {
    return mmkv.getString(STORAGE_KEYS.ACCESS_TOKEN) || "";
  }
  clearAccessToken() {
    mmkv.delete(STORAGE_KEYS.ACCESS_TOKEN);
  }

  //preferences
  getInitialPreferencesDone() {
    return mmkv.getBoolean(STORAGE_KEYS.INITIAL_PREFERENCES);
  }
  setInitialPreferencesDone() {
    mmkv.set(STORAGE_KEYS.INITIAL_PREFERENCES, true);
  }

  //location
  getShouldUseCurrentLocation() {
    return mmkv.getBoolean(STORAGE_KEYS.USE_CURRENT_LOCATION);
  }
  setShouldUseCurrentLocation(should: boolean) {
    mmkv.set(STORAGE_KEYS.USE_CURRENT_LOCATION, should);
  }

  //search history
  setSearchHistory(history: string[]) {
    mmkv.set(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
  }
  getSearchHistory(): string[] {
    const h = mmkv.getString(STORAGE_KEYS.SEARCH_HISTORY);
    if (h) return JSON.parse(h);
    else return [];
  }
}

const ls = new LocalStorage();

export default ls;
