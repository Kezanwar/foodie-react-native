import AppReady from "hocs/app-ready";
import AuthInitializer from "hocs/auth-initializer";
import Notifications from "hocs/notifications";
import RootNavigator from "navigation/root";

export default function App() {
  return (
    <AppReady>
      <AuthInitializer>
        <Notifications>
          <RootNavigator />
        </Notifications>
      </AuthInitializer>
    </AppReady>
  );
}
