import { Dimensions, Platform } from "react-native";

export const LIGHT = "light";

export const DARK = "dark";

export const CAROUSEL_TOTAL_ITEM_WIDTH = Dimensions.get("window").width * 0.74;
export const CAROUSEL_CARD_WIDTH = Dimensions.get("window").width * 0.7;
export const CAROUSEL_DIVIDER_WIDTH = Dimensions.get("window").width * 0.04;

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
