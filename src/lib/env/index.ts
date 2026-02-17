import { isTestFlight } from "expo-testflight";
import * as Device from "expo-device";

export const stagingBaseURL = "https://api.thefoodiestaging.app/api";
export const localBaseURL = "http://192.168.1.149:5006/api";

const isSimulator = !Device.isDevice;

export const baseUrl = isTestFlight
  ? stagingBaseURL
  : isSimulator
    ? localBaseURL
    : process.env.EXPO_PUBLIC_BASE_URL;

export const androidOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_ANDROID_OAUTH_CLIENT_ID as string;

export const iOSOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_IOS_OAUTH_CLIENT_ID as string;

export const APP_VERSION = "18.02.2026";

export const DEEP_LINK_BASE_URL = //@ts-ignore
  (process.env.EXPO_PUBLIC_DEEP_LINK_BASE_URL as string) ||
  "https://thefoodiestaging.app";
