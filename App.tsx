import AppReady from "hocs/app-ready";
import AuthInitializer from "hocs/auth-initializer";
import { usePushNotifications } from "hooks/usePushNotifications";

import RootNavigator from "navigation/root";

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();

  console.log(expoPushToken);
  return (
    <AppReady>
      <AuthInitializer>
        <RootNavigator />
      </AuthInitializer>
    </AppReady>
  );
}
