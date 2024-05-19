import { NotificationRequest } from "expo-notifications";
import { navigate } from "../navigation/Navigation";
import { HOME_STACK } from "constants/routes";

const handleNotification = (request: NotificationRequest): void => {
  console.log("res", request);
  switch (request.content.data?.type) {
    case NOTIFICATION_TYPES.DEAL:
      navigate(HOME_STACK.SINGLE_RESTAURANT, {
        location_id: request.content.data?.location_id,
      });
      break;

    default:
      break;
  }
};

export default handleNotification;
