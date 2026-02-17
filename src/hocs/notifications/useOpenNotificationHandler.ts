import { useCallback } from "react";
import { NotificationRequest } from "expo-notifications";

import { HOME_STACK } from "constants/routes";
import { NOTIFICATION_TYPES } from "./types";
import useAppDispatch from "hooks/useAppDispatch";
import { setSingleDeal } from "store/single-deal";
import { external_navigate } from "hocs/app-ready/providers/navigation/Navigation";

const useOpenNotificationHandler = () => {
  const dispatch = useAppDispatch();
  const onOpen = useCallback((request: NotificationRequest): void => {
    switch (request.content.data?.type) {
      case NOTIFICATION_TYPES.SINGLE_DEAL:
        external_navigate(HOME_STACK.SINGLE_RESTAURANT, {
          location_id: request.content.data.location_id,
        });
        dispatch(
          setSingleDeal({
            deal_id: request.content.data.deal_id,
            location_id: request.content.data.location_id,
            stack: HOME_STACK,
            linkRestaurant: true,
          }),
        );
        break;
      case NOTIFICATION_TYPES.HOME_FEED:
        external_navigate(HOME_STACK.ROOT);
        setSingleDeal(undefined);
        break;
      default:
        break;
    }
  }, []);
  return onOpen;
};

export default useOpenNotificationHandler;
