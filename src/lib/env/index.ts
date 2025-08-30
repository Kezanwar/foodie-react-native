export const localBaseURL = "http://192.168.1.133:5006/api";
//@ts-ignore
export const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
// export const baseUrl = `https://api.thefoodiestaging.app/api`;
// export const baseUrl = localBaseURL;

export const androidOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_ANDROID_OAUTH_CLIENT_ID as string;

export const iOSOAuthClientId = //@ts-ignore
  process.env.EXPO_PUBLIC_IOS_OAUTH_CLIENT_ID as string;

export const APP_VERSION = "27.11.2024";

export const DEEP_LINK_BASE_URL = //@ts-ignore
  (process.env.EXPO_PUBLIC_DEEP_LINK_BASE_URL as string) ||
  "https://thefoodiestaging.app";
