import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notify from "expo-notifications";
import Constants from "expo-constants";
import { postPushToken } from "lib/api";

async function registerForPushNotificationsAsync(): Promise<
  Notify.ExpoPushToken | undefined
> {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notify.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notify.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return undefined;
    }

    token = await Notify.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    });

    await postPushToken(token.data);
  } else {
    Alert.alert("Must be using a physical device for Push notifications");
    return undefined;
  }

  if (Platform.OS === "android") {
    Notify.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notify.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default registerForPushNotificationsAsync;
