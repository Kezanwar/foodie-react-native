import { MMKV } from "react-native-mmkv";
import { LocationStorageData } from "store/location/location.slice";
import { IFeedDeal } from "types/feed";

const mmkv = new MMKV();

const STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  INITIAL_PREFERENCES: "INITIAL_PREFERENCES",
  USE_CURRENT_LOCATION: "USE_CURRENT_LOCATION",
  SEARCH_HISTORY: "SEARCH_HISTORY",
  LAST_KNOWN_LOCATION: "LAST_KNOWN_LOCATION",
  RECENTLY_VIEWED_DISPLAY: "RECENTLY_VIEWED_DISPLAY",
  RECENTLY_VIEWED_STATS: "RECENTLY_VIEWED_STATS",
};

type RecentlyViewedDealStatMap = {
  [key: string]: number;
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

  //recently viewed (DISPLAY)
  setRecentlyViewedDisplay(deal: IFeedDeal) {
    const curr = mmkv.getString(STORAGE_KEYS.RECENTLY_VIEWED_DISPLAY);

    if (curr) {
      let p: IFeedDeal[] = JSON.parse(curr);

      p.unshift(deal);

      if (p.length > 5) {
        p.pop();
      }

      mmkv.set(STORAGE_KEYS.RECENTLY_VIEWED_DISPLAY, JSON.stringify(p));
    } else {
      mmkv.set(STORAGE_KEYS.RECENTLY_VIEWED_DISPLAY, JSON.stringify([deal]));
    }

    setTimeout(() => {
      const currStats = mmkv.getString(STORAGE_KEYS.RECENTLY_VIEWED_STATS);
      const deal_map_key = `${deal.deal._id}--${deal.location._id}`;
      if (currStats) {
        let s: RecentlyViewedDealStatMap = JSON.parse(currStats);

        if (s[deal_map_key]) {
          s[deal_map_key] = s[deal_map_key] + 1;
        } else {
          s[deal_map_key] = 1;
        }

        mmkv.set(STORAGE_KEYS.RECENTLY_VIEWED_STATS, JSON.stringify(s));
      } else {
        mmkv.set(
          STORAGE_KEYS.RECENTLY_VIEWED_STATS,
          JSON.stringify({
            [deal_map_key]: 1,
          })
        );
      }
    }, 1000);
  }

  getRecentlyViewedDisplay(): IFeedDeal[] {
    const curr = mmkv.getString(STORAGE_KEYS.RECENTLY_VIEWED_DISPLAY);
    return curr ? JSON.parse(curr) : [];
  }

  getRecentlyViewedStats() {
    const curr = mmkv.getString(STORAGE_KEYS.RECENTLY_VIEWED_STATS);
    return curr ? JSON.parse(curr) : undefined;
  }

  deleteRecentlyViewedStats() {
    mmkv.delete(STORAGE_KEYS.RECENTLY_VIEWED_STATS);
  }
}

const ls = new LocalStorage();

export default ls;
