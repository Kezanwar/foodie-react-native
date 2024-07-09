import { MMKV } from "react-native-mmkv";
import { LocationLocalStorageData } from "store/location/location.slice";
import { IFeedDeal } from "types/feed";

const mmkv = new MMKV();

const KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  INITIAL_PREFERENCES: "INITIAL_PREFERENCES",
  USE_CURRENT_LOCATION: "USE_CURRENT_LOCATION",
  SEARCH_HISTORY: "SEARCH_HISTORY",
  LAST_KNOWN_LOCATION: "LAST_KNOWN_LOCATION",
  RECENTLY_VIEWED_DISPLAY: "RECENTLY_VIEWED_DISPLAY",
  STATS: "STATS",
};

class LocalStorage {
  //default
  static clearLocalStorage() {
    mmkv.clearAll();
  }

  //access token
  static storeAccessToken(accessToken: string) {
    mmkv.set(KEYS.ACCESS_TOKEN, accessToken);
  }
  static getAccessToken() {
    return mmkv.getString(KEYS.ACCESS_TOKEN) || "";
  }
  static clearAccessToken() {
    mmkv.delete(KEYS.ACCESS_TOKEN);
  }

  //preferences
  static getInitialPreferencesDone() {
    return mmkv.getBoolean(KEYS.INITIAL_PREFERENCES);
  }
  static setInitialPreferencesDone() {
    mmkv.set(KEYS.INITIAL_PREFERENCES, true);
  }

  //location
  static getShouldUseCurrentLocation() {
    return mmkv.getBoolean(KEYS.USE_CURRENT_LOCATION);
  }
  static setShouldUseCurrentLocation(should: boolean) {
    mmkv.set(KEYS.USE_CURRENT_LOCATION, should);
  }
  static setlastKnownLocation(location: LocationLocalStorageData) {
    if (location) {
      mmkv.set(KEYS.LAST_KNOWN_LOCATION, JSON.stringify(location));
    }
  }
  static getLastKnownLocation(): LocationLocalStorageData {
    const str = mmkv.getString(KEYS.LAST_KNOWN_LOCATION);
    if (str) {
      return JSON.parse(str);
    } else return undefined;
  }
  static clearLastKnownLocation() {
    mmkv.delete(KEYS.LAST_KNOWN_LOCATION);
  }

  //search history
  static setSearchHistory(history: string[]) {
    mmkv.set(KEYS.SEARCH_HISTORY, JSON.stringify(history));
  }
  static getSearchHistory(): string[] {
    const h = mmkv.getString(KEYS.SEARCH_HISTORY);
    if (h) return JSON.parse(h);
    else return [];
  }

  //recently viewed (DISPLAY)
  static setRecentlyViewedDisplay(deal: any) {
    const curr = mmkv.getString(KEYS.RECENTLY_VIEWED_DISPLAY);

    if (curr) {
      let p: IFeedDeal[] = JSON.parse(curr);

      p.unshift(deal);

      if (p.length > 5) {
        p.pop();
      }

      mmkv.set(KEYS.RECENTLY_VIEWED_DISPLAY, JSON.stringify(p));
    } else {
      mmkv.set(KEYS.RECENTLY_VIEWED_DISPLAY, JSON.stringify([deal]));
    }

    setTimeout(function () {
      LocalStorage.addViewDealStat(deal);
    }, 1000);
  }

  static getRecentlyViewedDisplay(): IFeedDeal[] {
    const curr = mmkv.getString(KEYS.RECENTLY_VIEWED_DISPLAY);
    return curr ? JSON.parse(curr) : [];
  }

  static addViewDealStat(deal: IFeedDeal) {
    let stats = this.getStats();
    const deal_map_key = `${deal.deal._id}--${deal.location._id}`;

    if (!stats) {
      stats = this.makeDefaultStats();
    }

    if (stats.deals[deal_map_key]) {
      stats.deals[deal_map_key] = stats.deals[deal_map_key] + 1;
    } else {
      stats.deals[deal_map_key] = 1;
    }

    this.saveStats(stats);
  }

  static addViewLocationStat(location_id: string) {
    let stats = this.getStats();

    if (!stats) {
      stats = this.makeDefaultStats();
    }

    if (stats.locations[location_id]) {
      stats.locations[location_id] = stats.locations[location_id] + 1;
    } else {
      stats.locations[location_id] = 1;
    }

    this.saveStats(stats);
  }

  static addBookingClickStat(location_id: string) {
    let stats = this.getStats();

    if (!stats) {
      stats = this.makeDefaultStats();
    }

    if (stats.booking_clicks[location_id]) {
      stats.booking_clicks[location_id] = stats.booking_clicks[location_id] + 1;
    } else {
      stats.booking_clicks[location_id] = 1;
    }

    this.saveStats(stats);
  }

  static makeDefaultStats() {
    return {
      deals: {},
      locations: {},
      booking_clicks: {},
    };
  }

  static getStats() {
    const curr = mmkv.getString(KEYS.STATS);
    return curr ? JSON.parse(curr) : undefined;
  }

  static saveStats(stats: any) {
    mmkv.set(KEYS.STATS, JSON.stringify(stats));
  }

  static clearStats() {
    mmkv.delete(KEYS.STATS);
  }
}

export default LocalStorage;
