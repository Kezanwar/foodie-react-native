import { MMKV } from "react-native-mmkv";
import { LocationStorageData } from "store/location/location.slice";

const mmkv = new MMKV();

const STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  INITIAL_PREFERENCES: "INITIAL_PREFERENCES",
  USE_CURRENT_LOCATION: "USE_CURRENT_LOCATION",
  SEARCH_HISTORY: "SEARCH_HISTORY",
  LAST_KNOWN_LOCATION: "LAST_KNOWN_LOCATION",
};

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
  setlastKnownLocation(location: LocationStorageData) {
    if (location) {
      mmkv.set(STORAGE_KEYS.LAST_KNOWN_LOCATION, JSON.stringify(location));
    }
  }
  getLastKnownLocation(): LocationStorageData {
    const str = mmkv.getString(STORAGE_KEYS.LAST_KNOWN_LOCATION);
    if (str) {
      return JSON.parse(str);
    } else return undefined;
  }
  clearLastKnownLocation() {
    mmkv.delete(STORAGE_KEYS.LAST_KNOWN_LOCATION);
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
