import { isTestFlight } from "expo-testflight";

export const stagingBaseURL = "https://api.thefoodiestaging.app/api";
export const localBaseURL = "http://192.168.1.251:5006/api";

export const baseUrl = isTestFlight
  ? stagingBaseURL
  : //@ts-ignore
    process.env.EXPO_PUBLIC_BASE_URL;

// export const baseUrl = localBaseURL;

export const androidOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_ANDROID_OAUTH_CLIENT_ID as string;

export const iOSOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_IOS_OAUTH_CLIENT_ID as string;

export const APP_VERSION = "19.01.2026";

export const DEEP_LINK_BASE_URL = //@ts-ignore
  (process.env.EXPO_PUBLIC_DEEP_LINK_BASE_URL as string) ||
  "https://thefoodiestaging.app";
