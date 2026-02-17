import { useEffect, useRef, FC, ReactNode } from "react";
import * as Notify from "expo-notifications";

import useAppDispatch from "hooks/useAppDispatch";

import { clearNotification, setNotification } from "store/notifications";

import { useAppSelector } from "hooks/useAppSelector";
import useOpenNotificationHandler from "./useOpenNotificationHandler";

type Props = {
  children: ReactNode;
};

const Notifications: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(
    (state) => state.notifications.notification,
  );

  const openNotificationHandler = useOpenNotificationHandler();

  Notify.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  //   const notificationListener = useRef<Notify.Subscription>();
  const responseListener = useRef<Notify.EventSubscription>(null);

  useEffect(() => {
    // notificationListener.current = Notify.addNotificationReceivedListener(
    //   (notification) => {
    //     dispatch(setNotification(notification));
    //     console.log("not", notification);
    //   }
    // );

    responseListener.current = Notify.addNotificationResponseReceivedListener(
      (response) => dispatch(setNotification(response.notification)),
    );

    return () => {
      responseListener.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (notification) {
      openNotificationHandler(notification.request);
      dispatch(clearNotification());
    }
  }, [notification]);

  return children;
};

export default Notifications;
