import { Dimensions, Platform } from "react-native";

export const LIGHT = "light";

export const DARK = "dark";

export const CAROUSEL_ITEM_WIDTH = Dimensions.get("window").width * 0.74;

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
