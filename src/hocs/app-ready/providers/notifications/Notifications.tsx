import { useEffect, useRef, FC, ReactNode } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notify from "expo-notifications";
import Constants from "expo-constants";

import useAppDispatch from "hooks/useAppDispatch";

import {
  setExpoPushToken,
  //   setNotification,
} from "store/notifications/notifications.slice";
import handleNotification from "./handle-notification";

type Props = {
  children: ReactNode;
};

const Notifications: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  Notify.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  //   const notificationListener = useRef<Notify.Subscription>();
  const responseListener = useRef<Notify.Subscription>();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notify.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notify.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = await Notify.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      alert("Must be using a physical device for Push notifications");
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

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        dispatch(setExpoPushToken(token));
      }
    });

    // notificationListener.current = Notify.addNotificationReceivedListener(
    //   (notification) => {
    //     dispatch(setNotification(notification));
    //     console.log("not", notification);
    //   }
    // );

    responseListener.current = Notify.addNotificationResponseReceivedListener(
      (response) => handleNotification(response.notification.request)
    );

    return () => {
      //   Notify.removeNotificationSubscription(notificationListener.current!);
      Notify.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return children;
};

export default Notifications;
